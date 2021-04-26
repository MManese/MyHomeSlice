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
    for(let i = 0; i < 40; i++) {
        const rep = new Recipe({
            author:'60835fc27821ed4898d12eda',
            title: `${sample(descriptors)} ${sample(foods)}`,
            servings: 10,
            cooktime: '1 hour',
            ingredients: 'apples, gluten-free flour, butter',
            directions: '1. Step one, 2. Step two, 3. Step three, 4. Step four',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, blanditiis! Ullam fugiat nihil aliquam accusamus, exercitationem rem voluptates numquam error neque soluta voluptate quibusdam praesentium atque in explicabo eum laborum.',
            notes:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, blanditiis!',
            category: 'Dessert',
            images:[
                {
                    url: 'https://res.cloudinary.com/dprujjry9/image/upload/v1619401615/MyHomeSlice/iuctqslugmrht8loij8p.jpg',
                    filename: 'MyHomeSlice/iuctqslugmrht8loij8p'
                },
                {
            
                    url: 'https://res.cloudinary.com/dprujjry9/image/upload/v1619401618/MyHomeSlice/zkfxoinquqeyjp5iquxv.jpg',
                    filename: 'MyHomeSlice/zkfxoinquqeyjp5iquxv'
                },
                {
            
                    url: 'https://res.cloudinary.com/dprujjry9/image/upload/v1619401620/MyHomeSlice/ztslglsup2drfqsbl5ls.jpg',
                    filename: 'MyHomeSlice/ztslglsup2drfqsbl5ls'
                },
                {
            
                    url: 'https://res.cloudinary.com/dprujjry9/image/upload/v1619401622/MyHomeSlice/oufovvcbwziqga70yczs.jpg',
                    filename: 'MyHomeSlice/oufovvcbwziqga70yczs'
                },
                {
            
                    url: 'https://res.cloudinary.com/dprujjry9/image/upload/v1619401626/MyHomeSlice/hjgm4lgnwylnbhdlkpfr.jpg',
                    filename: 'MyHomeSlice/hjgm4lgnwylnbhdlkpfr'
                }
            ]

        })
        await rep.save();
    }
}

seedDB().then(() =>{
    mongoose.connection.close();
})