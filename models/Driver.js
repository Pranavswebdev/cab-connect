// models/Driver.js
const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Driver = mongoose.model('Driver', DriverSchema);
module.exports = Driver;