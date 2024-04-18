// models/Trip.js
const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cabId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cab', required: true },
    pickupLocation: {
        type: { type: String, default: 'Point' },
        coordinates: [Number],
    },
    destination: {
        type: { type: String, default: 'Point' },
        coordinates: [Number],
    },
    fare: { type: Number, required: true },
    status: {
        type: String,
        enum: ['requested', 'accepted', 'completed', 'cancelled'],
        default: 'requested',
    },
});

TripSchema.index({ pickupLocation: '2dsphere', destination: '2dsphere' });

const Trip = mongoose.model('Trip', TripSchema);
module.exports = Trip;