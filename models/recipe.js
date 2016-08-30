// recipe.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    	title: String,
    	image: String,
    	description: String,
    	ingredients: [String],
    	prep_time: String,
    	cook_time: String,
    	directions: String,
    	// owner: { type: Schema.Types.ObjectId, ref: 'User' }
    	// facebook_id : { type: Number, ref: 'User' },
});

var Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
