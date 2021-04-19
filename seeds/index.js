const mongoose = require('mongoose');
const { foods, descriptors, images } = require('./seedHelpers');
const Recipe = require('../models/recipe');

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

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Recipe.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const rep = new Recipe({
            image: `${sample(images)}`,
            title: `${sample(descriptors)} ${sample(foods)}`,
            servings: 10,
            cooktime: '1 hour',
            ingredients: 'apples, gluten-free flour, butter',
            directions: '1. Step one, 2. Step two, 3. Step three, 4. Step four',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, blanditiis! Ullam fugiat nihil aliquam accusamus, exercitationem rem voluptates numquam error neque soluta voluptate quibusdam praesentium atque in explicabo eum laborum.',
            category: 'Dessert',
            favorite: 'yes'

        })
        await rep.save();
    }
}

seedDB().then(() =>{
    mongoose.connection.close();
})