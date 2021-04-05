const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: String,
    description: String,
    servings: Number,
    cooktime: String,
    note: String
});

module.exports = mongoose.model('Recipe', RecipeSchema);