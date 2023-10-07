const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const RestaurantSchema = new mongoose.Schema({
    name: String,
    logo: String,
    website: String,
    Country: String,
    phoneNumber: String,
    Meals: [{type: mongoose.Schema.Types.ObjectId, ref: 'Meal'}]
});

const MealSchema = new mongoose.Schema({
    name: String,
    calories: Number,
    MB: Boolean,
    Restaurant: {type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'}
});


const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    // other fields...
});

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = {
    Restaurant: mongoose.model('Restaurant', RestaurantSchema),
    Meal: mongoose.model('Meal', MealSchema),
    User: mongoose.model('User', UserSchema)
};
