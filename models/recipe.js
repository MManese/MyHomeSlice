const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: String,
    image: String,
    description: String,
    servings: String,
    cooktime: String,
    note: String,
    ingredients: String,
    directions: String,
    category: String,
    favorite: Boolean
});

module.exports = mongoose.model('Recipe', RecipeSchema);