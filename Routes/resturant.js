const Router = require("express").Router();
const {Restaurant, Meal} = require('../Models/schemas.js');
const authMiddleware = require('../authMiddleware.js');

Router.use('/protected-route', authMiddleware);

Router.get('/protected-route', (req, res) => {
    res.send('This is a protected route');
});

Router.get('/name', async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ name: req.params.name }).populate('Meals');
        // Categorize meals by calorie count
        const categorizedMeals = {
            "400": [],
            "500": [],
            "600": [],
            "700": [],
            "800": []
        };

        if (Array.isArray(restaurant.Meals)) {
            restaurant.Meals.forEach(meal => {
                // Check if calories is defined
                if (typeof meal.calories !== 'undefined') {
                    const calorieCategory = String(meal.calories);
                    if (categorizedMeals[calorieCategory]) {
                        categorizedMeals[calorieCategory].push(meal);
                    }
                }
            });
        }

        // Send restaurant data and categorized meals
        res.send({
            restaurant: {
                name: restaurant.name,
                logo: restaurant.logo,
                website: restaurant.website,
                Country: restaurant.Country,
                phoneNumber: restaurant.phoneNumber
            },
            meals: categorizedMeals
        });
    } catch (err) {
        res.status(500).send('Internal Server Error');
        console.error(err);
    }});


    Router.get('/insert-dummy', async (req, res) => {
        try {
            // Create a new restaurant
            const restaurant = new Restaurant({
                name: 'LEEN’s, TACO Bell',
                logo: 'https://example.com/logo.png',
                website: 'https://leens-tacobell.com',
                Country: 'USA',
                phoneNumber: '+1234567890',
                Meals: []
            });
    
            // Create meals
            const mealsData = [
                {name: 'Meal1', calories: 400, MB: true},
                {name: 'Meal2', calories: 500, MB: false},
                {name: 'Meal3', calories: 600, MB: true},
                {name: 'Meal4', calories: 700, MB: false},
                {name: 'Meal5', calories: 800, MB: true}
            ];
    
            // Save meals and link to the restaurant
            for (const mealData of mealsData) {
                const meal = new Meal({
                    ...mealData,
                    Restaurant: restaurant._id
                });
                await meal.save();
                restaurant.Meals.push(meal._id);
            }
    
            // Save the restaurant
            await restaurant.save();
    
            res.send('Dummy data inserted!');
        } catch (err) {
            res.status(500).send('Internal Server Error');
            console.error(err);
        }

    });





    Router.get('/', async (req, res) => {
        try {
            const restaurants = await Restaurant.find().populate('Meals');
            
            const responseData = restaurants.map(restaurant => {
                const categorizedMeals = {
                    "400": [],
                    "500": [],
                    "600": [],
                    "700": [],
                    "800": []
                };
    
                // Check if Meals is defined and is an array
                if (Array.isArray(restaurant.Meals)) {
                    restaurant.Meals.forEach(meal => {
                        // Check if calories is defined
                        if (typeof meal.calories !== 'undefined') {
                            const calorieCategory = String(meal.calories);
                            if (categorizedMeals[calorieCategory]) {
                                categorizedMeals[calorieCategory].push(meal);
                            }
                        }
                    });
                }
    
                return {
                    restaurant: {
                        name: restaurant.name,
                        logo: restaurant.logo,
                        website: restaurant.website,
                        Country: restaurant.Country,
                        phoneNumber: restaurant.phoneNumber
                    },
                    meals: categorizedMeals
                };
            });
    
            res.send(responseData);
        } catch (err) {
            res.status(500).send('Internal Server Error');
            console.error(err);
        }
    });
    

Router.post('/Add', async(req, res) => {
    const resturent = new Restaurant({
        name: req.body.name,
        logo: req.body.logo,
        website: req.body.website,
        Country : req.body.Country,
        phoneNumber: req.body.phoneNumber,
        // Meals: req.body.Meals
    });
    await resturent.save();
    res.send(resturent);
});

module.exports = Router;

// Router.post('/mealAdd', async(req, res) => {
//     const resturent = await Restuent.find()._id(req.body.id);
//     resturent.Meals.push(req.body.Meals._id);
// });






