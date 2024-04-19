
const cabService = require('../services/cabService');

exports.createCab = async (req, res) => {
    console.log("here");
    try {
        const cab = await cabService.createCab(req.body);
        console.log({cab});
        res.status(201).send(cab);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
};

exports.getCabs = async (req, res) => {
    try {
        const cabs = await cabService.getCabs(req.params.cabId);
        res.send(cabs);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getCabById = async (req, res) => {
    try {

        console.log(req.params,'params');
       
        const cab = await cabService.getCabById(req.params.id);
        res.send(cab);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.updateCab = async (req, res) => {
    try {
        const updatedCab = await cabService.updateCab(req.params.id, req.body);
        res.send(updatedCab);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.deleteCab = async (req, res) => {
    try {
        await cabService.deleteCab(req.params.id);
        res.send({ message: 'Cab deleted' });
    } catch (e) {
        res.status(400).send(e);
    }
};