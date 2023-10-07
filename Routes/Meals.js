const MealRouter = require('express').Router();

const { Meal } = require('../Models/schemas.js');

MealRouter.get('/meal', async (req, res) => {
  const meal = await Meal.find();
  res.json(meal);
});

MealRouter.post('/meal', async (req, res) => {
    const meal = new Meal({
        name: req.body.name,
        calories: req.body.calories,
        MB: req.body.MB,
        Resturent: req.body.Resturent
    });
    await meal.save();
    res.json(meal);
    });


module.exports = MealRouter;

