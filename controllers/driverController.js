// controllers/driverController.js
const driverService = require('../services/driverService');

exports.signup = async (req, res) => {

    try {
        const { driver, token } = await driverService.signup(req.body);
        // const token = await driver.generateAuthToken();
        res.status(201).send({ driver, token });
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.login = async (req, res) => {
    try {
        const {driver,token }= await driverService.login(req.body.email, req.body.password);
        // const token = await driver.generateAuthToken();
        res.send({ driver, token });
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getProfile = async (req, res) => {
    res.send(req.driver);
};

exports.updateProfile = async (req, res) => {
    try {
        const updatedDriver = await driverService.updateProfile(req.driver, req.body);
        res.send(updatedDriver);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getNearby = async (req, res) => {
    try {
        const nearbyCabs = await driverService.getNearby(req.driver);
        res.send(nearbyCabs);
    } catch (e) {
        res.status(400).send(e);
    }
};