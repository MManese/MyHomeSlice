const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

//recipe schema validation
module.exports.recipeSchema = Joi.object({
    recipe: Joi.object({
        title: Joi.string().required().escapeHTML(),
        servings: Joi.number().required().min(1),
        cooktime: Joi.string().escapeHTML(),
        category: Joi.string().escapeHTML(),
        description: Joi.string().escapeHTML(),
        ingredients: Joi.string().escapeHTML(),
        directions: Joi.string().escapeHTML(),
    }).required(),
    deleteImages: Joi.array() 
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body:Joi.string().required().escapeHTML()
    }).required() 
})