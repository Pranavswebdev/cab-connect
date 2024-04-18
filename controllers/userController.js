// controllers/userController.js
const userService = require('../services/userService');

exports.signup = async (req, res) => {
    try {
        console.log(req.body,'body');
        const { user, token } = await userService.signup(req.body);
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { user, token } = await userService.login(req.body.email, req.body.password);
        
        res.send({ user, token });
    } catch (e) {
        res.status(400).send(e.message);
    }
};

exports.getProfile = async (req, res) => {
    res.send(req.user);
};

exports.updateProfile = async (req, res) => {
    try {
        const updatedUser = await userService.updateProfile(req.user, req.body);
        res.send(updatedUser);
    } catch (e) {
        res.status(400).send(e.message);
    }
};