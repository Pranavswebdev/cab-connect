// services/driverService.js
const Driver = require('../models/Driver');
const Cab = require('../models/Cab');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (driverData) => {
    try {
        const driver = new Driver(driverData);
        driver.password = await bcrypt.hash(driverData.password, 8);
        await driver.save();
        const token = jwt.sign({ _id: driver._id.toString() }, 'your_secret_key');
        return { driver, token };
    } catch (error) {
        console.log(error);

    }
};

exports.login = async (email, password) => {
    console.log({ email, password });
    try {
        const driver = await Driver.findOne({ email });
        console.log({ driver });
        if (!driver) {
            throw new Error('Unable to login. User not found.');
        }

        const isPasswordMatch = await bcrypt.compare(password, driver.password);
        console.log(isPasswordMatch);
        if (!isPasswordMatch) {
            console.log("pass miss match");
            throw new Error('Unable to login. Invalid password.');
        }

        const driverWithoutPassword = { ...driver.toObject() };
        delete driverWithoutPassword.password;
        const token = jwt.sign({ _id: driverWithoutPassword._id.toString() }, 'your_secret_key');
        return { driver: driverWithoutPassword, token: token };

    } catch (error) {
        console.log(error);
        return error

    }
};

exports.updateProfile = async (driver, updates) => {
    const allowedUpdates = ['name', 'email', 'phone', 'vehicleType', 'licensePlate'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        throw new Error('Invalid updates!');
    }

    updates.forEach((update) => (driver[update] = updates[update]));
    await driver.save();
    return driver;
};

exports.getNearby = async (driver) => {
    const nearbyCabs = await Cab.find({
        currentLocation: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: driver.currentLocation.coordinates,
                },
                $maxDistance: 5000, // 5 km radius
            },
        },
    });
    return nearbyCabs;
};