var mongoose = require('mongoose'),
    Recipe = require('./recipe.js'),
    RecipeSchema = mongoose.model('Recipe').schema,
    Schema = mongoose.Schema;
 
 
var UserSchema = mongoose.Schema({  
	facebook: {
	    id: Number,
	    token: String,
	    email: String,
	    name: String,
	    photos: String,
	},
		recipes : [RecipeSchema]
});
 
var User = mongoose.model('User', UserSchema);

module.exports = User;
 