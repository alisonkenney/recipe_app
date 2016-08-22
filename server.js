// Setup Modules
var express    = require('express');
var app        = express();
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var port       = process.env.PORT || 3000;
var path = require('path');
var db = require('./models');

// Use Public for Frontend
app.use(express.static(__dirname + '/public'));

//Index Route
app.get('/', function(req, res) {
  res.send("You're Home!");
});

//API Routes
//INDEX
app.get('/api/recipes', function (req, res) {
  db.Recipe.find(function(err, recipes){
    if (err) { return console.log("index error: " + err); }
    res.json(recipes);
  });
});

//SHOW
app.get('/api/recipes/:title', function(req, res) {
  db.Recipe.findOne({title: req.params.title }, function(err, recipe) {
    res.json(recipe);
  });
});

//CREATE A NEW RECIPE
app.post('/api/recipes/new', function (req, res) {
  // create new recipe
  var newRecipe;
  console.log(req.body);
  newRecipe = new db.Recipe({
    title: req.body.title,
    description: req.body.description,
    ingredients: req.body.ingredients,
    directions: req.body.directions,
    prep_time: req.body.prep_time,
    cook_time: req.body.cook_time,
  });
    // save newRecipe to database
    newRecipe.save(function(err, recipe){
      if (err) {
        return console.log("save error: " + err);
      }
      // send back the recipe
      res.json(recipe); 
    });   
});       


// Start Server
app.listen(port, function() {
  console.log('Server started on', port); 
});