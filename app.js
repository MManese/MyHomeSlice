const express = require ('express');
const path = require ('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const{recipeSchema, reviewSchema} = require('./schemas.js');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const Recipe = require('./models/recipe');
const Review = require('./models/review');

mongoose.connect('mongodb://localhost:27017/my-home-slice',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

//validate new and update recipe data using Joi
const validateRecipe = (req, res, next) => {
    const {error} = recipeSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

//validate recipe review data using Joi
const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/recipes', catchAsync(async(req, res) => {
    const recipes = await Recipe.find({});
    res.render('recipes/index', {recipes})
}));

app.get('/recipes/new', (req, res) => {
    res.render('recipes/new');
})

//make new recipe
app.post('/recipes', validateRecipe, catchAsync (async(req, res, next) => {
    //if(!req.body.recipe) throw new ExpressError('Invalid Recipe Data', 400);
    const recipe = new Recipe(req.body.recipe);
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}`)
}))

app.get('/recipes/:id', catchAsync(async(req, res) => {
    const recipe = await Recipe.findById(req.params.id)
    res.render('recipes/show', { recipe });
}))

app.get('/recipes/:id/edit', catchAsync(async(req, res) => {
    const recipe = await Recipe.findById(req.params.id)
    res.render('recipes/edit', { recipe });
}))

//update recipe
app.put('/recipes/:id', validateRecipe, catchAsync(async (req, res) =>{
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndUpdate(id, { ...req.body.recipe });
    res.redirect(`/recipes/${recipe._id}`)
}));

//delete recipe
app.delete('/recipes/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Recipe.findByIdAndDelete(id);
    res.redirect('/recipes');
}));

//recipe review
app.post('/recipes/:id/reviews',validateReview, catchAsync(async(req,res) => {
    const recipe = await Recipe.findById(req.params.id);
    const review = new Review(req.body.review);
    recipe.reviews.push(review);
    await review.save();
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}`);
}))

app.all('*',(req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if(!err.message) err.message = 'Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})