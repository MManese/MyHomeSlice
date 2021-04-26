const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const Recipe = require('../models/recipe');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

//recipe review
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

//delete recipe review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor,catchAsync(reviews.deleteReview));

module.exports = router;