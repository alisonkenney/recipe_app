var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/recipe-app");

module.exports.Recipe = require("./recipe.js");
module.exports.User = require("./user.js");