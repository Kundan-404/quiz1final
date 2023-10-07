const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const MealRouter = require('./Routes/Meals.js');
const ResturantRouter = require('./Routes/resturant.js');
const authRoutes = require('./Routes/auth.js');

app.use('/auth', authRoutes);



app.use(express.json());
app.use('/meal', MealRouter);
app.use('/resturant', ResturantRouter);
app.use('/auth', authRoutes);
const port = 3000;
mongoose.
connect("mongodb+srv://admin:123@crud-api.5rgdwol.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp")
.then(() => {
    console.log("Successfully Connected")
}).catch(() =>{
    console.log("Not connected. Some error")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
