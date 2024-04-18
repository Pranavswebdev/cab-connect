// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Driver = require('../models/Driver');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log({token});
        const decoded = jwt.verify(token, 'your_secret_key');
        const user = await User.findOne({ _id: decoded._id, });
        const driver = await Driver.findOne({ _id: decoded._id, });

        if (!user && !driver) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        req.driver = driver;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = auth;