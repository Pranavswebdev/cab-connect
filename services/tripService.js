// services/tripService.js
const Trip = require('../models/Trip');
const Cab = require('../models/Cab');

exports.createTrip = async (tripData) => {
    const cab = await Cab.findById(tripData.cabId);
    if (!cab) {
        throw new Error('Cab not found');
    }

    const trip = new Trip({
        userId: tripData.userId,
        cabId: tripData.cabId,
        pickupLocation: tripData.pickupLocation,
        destination: tripData.destination,
        fare: tripData.fare,
    });
    await trip.save();
    return trip;
};

exports.getTrips = async (user) => {
    const trips = await Trip.find({ userId: user._id });
    return trips;
};

exports.getTripById = async (id) => {
    const trip = await Trip.findById(id);
    if (!trip) {
        throw new Error('Trip not found');
    }
    return trip;
};

exports.updateTrip = async (id, updates) => {
    const trip = await Trip.findById(id);
    if (!trip) {
        throw new Error('Trip not found');
    }

    const allowedUpdates = ['pickupLocation', 'destination', 'fare', 'status'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        throw new Error('Invalid updates!');
    }

    updates.forEach((update) => (trip[update] = updates[update]));
    await trip.save();
    return trip;
};

exports.deleteTrip = async (id) => {
    const trip = await Trip.findByIdAndDelete(id);
    if (!trip) {
        throw new Error('Trip not found');
    }
};