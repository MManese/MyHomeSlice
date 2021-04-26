const Recipe = require('../models/recipe');

module.exports.index = async(req, res) => {
    const recipes = await Recipe.find({});
    res.render('recipes/index', {recipes})
}

module.exports.renderNewForm = (req, res) => {
    res.render('recipes/new');
}

module.exports.createRecipe = async(req, res, next) => {
    const recipe = new Recipe(req.body.recipe);
    recipe.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    recipe.author = req.user._id;
    await recipe.save();
    console.log(recipe);
    req.flash('success', 'Successfully made a new recipe!');
    res.redirect(`/recipes/${recipe._id}`)
}

module.exports.showRecipe = async(req, res) => {
    const recipe = await Recipe.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path:'author'
        }
    }).populate('author');
    if(!recipe){
        req.flash('error', 'Cannot find that recipe!');
        return res.redirect('/recipes');
    }
    res.render('recipes/show', { recipe });
}

module.exports.renderEditForm = async(req, res) => {
    const recipe = await Recipe.findById(req.params.id)
    if(!recipe){
        req.flash('error', 'Cannot find that recipe!');
        return res.redirect('/recipes');
    }
    res.render('recipes/edit', { recipe });
}

module.exports.updateRecipe = async (req, res) =>{
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndUpdate(id, { ...req.body.recipe });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    recipe.images.push(...imgs);
    await recipe.save();
    req.flash('success', 'Successfully updated Recipe!');
    res.redirect(`/recipes/${recipe._id}`)
}

module.exports.deleteRecipe = async (req, res) => {
    const { id } = req.params;
    await Recipe.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted recipe!');
    res.redirect('/recipes');
}