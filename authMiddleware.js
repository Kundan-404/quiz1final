const jwt = require('jsonwebtoken');
const User = require("./Models/schemas").User // adjust path as needed

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).send('Authorization denied');
        }

        const decoded = jwt.verify(token, 'YOUR_SECRET_KEY');
        req.user = await User.findById(decoded.userId);
        next();
    } catch (err) {
        res.status(401).send('Authorization denied');
    }
};

module.exports = authMiddleware;
