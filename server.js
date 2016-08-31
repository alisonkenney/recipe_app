// Setup Modules
require('dotenv').config();
var passport = require('passport');
var express    = require('express');
var app        = express();
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var port       = process.env.PORT || 3000;
var path = require('path');
var cookieParser = require('cookie-parser');
var db = require('./models');
var FacebookStrategy = require('passport-facebook').Strategy;  
var User = require('./models/user');
var Recipe = require('./models/recipe');

//Auth

passport.use(new FacebookStrategy({
    clientID: process.env.FBCLIENTID,
    clientSecret: process.env.FBCLIENTSECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email', 'picture.type(large)']
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ 'facebook.id': profile.id}, function (err, user) {
      if (err) { return done(err) }
      if (!user) {
        user = new User();
          user.facebook.id    = profile.id;
          user.facebook.token = accessToken;
          user.facebook.name  = profile.displayName;
          user.facebook.email = profile.emails[0].value;
          user.facebook.photos = profile.photos ? profile.photos[0].value : 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png';
          user.recipes = [];

        user.save(function (err) {
          if (err) console.log(err);
          return done(err, user);
        });
      }
      else {
        return done(err, user);
      }
    });
  }
));

app.use(bodyParser.urlencoded()); 
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'dgadglaskdjgasdigealgkeasldkg',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
 
// Use Public for Frontend
app.use(express.static(__dirname + '/public'));

//Index Route
app.get('/', function(req, res) {
  res.send("You're Home!");
});

//API Routes
//INDEX
app.get('/api/recipes', function (req, res) {
  var allRecipes = [];

  db.User.find(function(err, users){
      for (var i = 0; i < users.length; i++) { 
        for(var j = 0; j < users[i].recipes.length; j++) {
          allRecipes.push(users[i].recipes[j]);

        }     
      }
      res.json(allRecipes);

  });
  // db.Recipe.find(function(err, recipes){
  //   if (err) { return console.log("index error: " + err); }
  //   res.json(recipes);
  // });
});

//SHOW
app.get('/api/recipes/:title', function(req, res) {

  db.User.find(function(err, users){
      for (var i = 0; i < users.length; i++) { 
        for(var j = 0; j < users[i].recipes.length; j++) {
          var current_recipe = users[i].recipes[j];
          if (current_recipe.title == req.params.title) {
              res.json(current_recipe);
              return;
          }

        }     
      } 
  });
});  

app.put('/api/recipes/:title', function(req, res) {
  db.User.find(function(err, users){
      for (var i = 0; i < users.length; i++) { 
        for(var j = 0; j < users[i].recipes.length; j++) {
          var current_recipe = users[i].recipes[j];
          if (current_recipe.title == req.params.title) {
              // current_recipe = req.body;
              var user_recipes = users[i].recipes.id(current_recipe.id);

              user_recipes.title = req.body.title;
              user_recipes.description = req.body.description;
              user_recipes.image = req.body.image;
              user_recipes.ingredients = req.body.ingredients;
              user_recipes.prep_time = req.body.prep_time;
              user_recipes.cook_time = req.body.cook_time;
              user_recipes.directions = req.body.directions;

              users[i].save(function(err, user) {
                // console.log(user);
                
                res.json({current_recipe: user.recipes.id(current_recipe.id), title: user_recipes.title});
              });    
          }
        }     
      } 
  });
}); 

  // db.Recipe.findOne({title: req.params.title }, function(err, recipe) {
  //   res.json(recipe);
  // });


//CREATE A NEW RECIPE
app.post('/api/recipes', function (req, res) {
  var recipe = new db.Recipe(req.body);
  var session = req.session;
  recipe.save(function(err) {
      db.User.findById(session.passport.user, function (err, user) {
          user.recipes.push(recipe);
          user.save();
          res.send(user);  
      }); 
  });  
}); 

app.get('/api/profile', function (req, res) {
  var session = req.session;
  // console.log(session.passport.user);
  var user = db.User.findById(session.passport.user, function (err, user) {
     // console.log(user);
     res.json(user);   
  });
});

app.delete('/api/recipes/:title', function destroy(req, res) {
  db.Recipe.remove({title: req.params.title}, function(err) {
    if (err) { return console.log(err); }
    res.status(200).send();
  });
});


app.get('/logout', function (req, res) {
  delete req.session.passport;
  console.log(req.session);
  // res.json({});
  res.redirect('/#/');
});

// Facebook routes
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile', 'user_photos'] }));

app.get('/auth/facebook/callback', passport.authenticate('facebook', { 
  successRedirect: '/#/profile',
  failureRedirect: '/',
}));    

// Start Server
app.listen(port, function() {
  console.log('Server started on', port); 
});