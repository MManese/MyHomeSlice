const { recipeSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Recipe = require('./models/recipe');
const Review = require('./models/review');

//validate user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        req.flash('error', 'you must be logged in first!');
        return res.redirect('/login');
    }
    next();
}

//validate new and update recipe data using Joi
module.exports.validateRecipe = (req, res, next) => {
    const {error} = recipeSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

//validate author of recipe
module.exports.isAuthor = async(req, res, next) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if(!recipe.author.equals(req.user._id)){
        req.flash('error', 'You can not have permission to edit someone elses submitted recipe!');
        return res.redirect(`/recipes/${id}`);
    }
    next();
}

//validate recipe review data using Joi
module.exports.validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

//validate author of review
module.exports.isReviewAuthor = async(req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash('error', 'You can not have permission to edit someone elses submitted recipe!');
        return res.redirect(`/recipes/${id}`);
    }
    next();
}