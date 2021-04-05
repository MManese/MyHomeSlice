const express = require ('express');
const path = require ('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Recipe = require('./models/recipe');
const { captureRejectionSymbol } = require('events');

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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/recipes', async(req, res) => {
    const recipes = await Recipe.find({});
    res.render('recipes/index', {recipes})
})

app.get('/recipes/new', (req, res) => {
    res.render('recipes/new');
})

app.post('/recipes', async(req, res) => {
    const recipe = new Recipe(req.body.recipe);
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}`)
})

app.get('/recipes/:id', async(req, res) => {
    const recipe = await Recipe.findById(req.params.id)
    res.render('recipes/show', { recipe });
})

app.get('/recipes/:id/edit', async(req, res) => {
    const recipe = await Recipe.findById(req.params.id)
    res.render('recipes/edit', { recipe });
})

app.put('/campgrounds/:id', async (req, res) =>{
    res.send("It Worked!")
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})