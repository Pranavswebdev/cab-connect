
const Cab = require('../models/Cab');

exports.createCab = async (cabData) => {
    const cab = new Cab({
        driverId: cabData.driverId,
        currentLocation: cabData.currentLocation,
        vehicleType: cabData.vehicleType,
        licensePlate: cabData.licensePlate
        
    });
    await cab.save();
    console.log({cab});
    return cab;
};

exports.getCabs = async () => {
    const cabs = await Cab.find();
    return cabs;
};

exports.getCabById = async (id) => {
    const cab = await Cab.find({driverId:id});
    console.log({cab});
    if (!cab) {
        throw new Error('Cab not found');
    }
    return cab;
};

exports.updateCab = async (id, updates) => {
    const cab = await Cab.findById(id).populate("driverId");
    if (!cab) {
        throw new Error('Cab not found');
    }

    const allowedUpdates = ['currentLocation'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        throw new Error('Invalid updates!');
    }

    updates.forEach((update) => (cab[update] = updates[update]));
    await cab.save();
    return cab;
};

exports.deleteCab = async (id) => {
    const cab = await Cab.findByIdAndDelete(id);
    if (!cab) {
        throw new Error('Cab not found');
    }
};