//This file is for validation for schema Data 
const Joi = require('joi');

//recipe schema validation
module.exports.recipeSchema = Joi.object({
    recipe: Joi.object({
        title: Joi.string().required(),
        servings: Joi.number().required().min(1),
        cooktime: Joi.string(),
        category: Joi.string(),
        description: Joi.string(),
        ingredients: Joi.string(),
        directions: Joi.string(),
        //image: Joi.string()
        
    }).required() 
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body:Joi.string().required()
    }).required() 
})