const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: String,
    image: String,
    description: String,
    servings: Number,
    cooktime: String,
    note: String,
    ingredients: String,
    directions: String,
    category: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
});

module.exports = mongoose.model('Recipe', RecipeSchema);