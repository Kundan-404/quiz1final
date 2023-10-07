const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const User = require('./userSchema');
const User = require('../Models/schemas.js').User;
 // adjust path as needed

const Router = express.Router();

Router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

Router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
        res.status(200).send({ token });
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = Router;
