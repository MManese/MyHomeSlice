const mongoose = require('mongoose');
const { foods, descriptors } = require('./seedHelpers');
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
            title: `${sample(descriptors)} ${sample(foods)}`
        })
        await rep.save();
    }
}

seedDB().then(() =>{
    mongoose.connection.close();
})