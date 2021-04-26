const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: String,
    images: [
        {
            url: String,
            filename: String
        }
    ],
    description: String,
    servings: Number,
    cooktime: String,
    notes: String,
    ingredients: String,
    directions: String,
    category: String,
    author: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
});

//When a campground is deleted, this is the middleware to delete all the reviews of the deleted campground
RecipeSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Recipe', RecipeSchema);