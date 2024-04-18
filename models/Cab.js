// models/Cab.js
const mongoose = require('mongoose');

const CabSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
    currentLocation: {
        type: { type: String, default: 'Point' },
        coordinates: {
            type: [Number], // Array of numbers
            index: '2dsphere' // Add index for 2dsphere
        }
    },
  vehicleType: { type: String, required: true },
  licensePlate: { type: String, required: true },
});

CabSchema.index({ currentLocation: '2dsphere' });

const Cab = mongoose.model('Cab', CabSchema);
module.exports = Cab;