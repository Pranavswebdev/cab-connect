// controllers/tripController.js
const tripService = require('../services/tripService');

exports.createTrip = async (req, res) => {
    try {
        const trip = await tripService.createTrip(req.body);
        res.status(201).send(trip);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
};

exports.getTrips = async (req, res) => {
    try {
        console.log(req.user,'user');
        const trips = await tripService.getTrips(req.user);
        res.send(trips);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getTripById = async (req, res) => {
    try {
        const trip = await tripService.getTripById(req.params.id);
        res.send(trip);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.updateTrip = async (req, res) => {
    try {
        const updatedTrip = await tripService.updateTrip(req.params.id, req.body);
        res.send(updatedTrip);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.deleteTrip = async (req, res) => {
    try {
        await tripService.deleteTrip(req.params.id);
        res.send({ message: 'Trip deleted' });
    } catch (e) {
        res.status(400).send(e);
    }
};