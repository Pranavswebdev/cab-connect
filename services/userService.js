// services/userService.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (userData) => {
    console.log({ userData });

    try {
        const user = new User(userData);
        user.password = await bcrypt.hash(user.password, 8);
        await user.save();
        const token = jwt.sign({ _id: user._id.toString() }, 'your_secret_key');
        return { user, token };
    } catch (error) {
        console.log(error);

    }

};

exports.login = async (email, password) => {

    console.log({ email, password });
    try {
        const user = await User.findOne({ email });
        console.log({ user });
        if (!user) {
            throw new Error('Unable to login. User not found.');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        console.log(isPasswordMatch);
        if (!isPasswordMatch) {
            console.log("pass miss match");
            throw new Error('Unable to login. Invalid password.');
        }

        const userWithoutPassword = { ...user.toObject() };
        delete userWithoutPassword.password;
        const token = jwt.sign({ _id: user._id.toString() }, 'your_secret_key');
        return { user: userWithoutPassword, token: token };

    } catch (error) {
        console.log(error);

    }


};

exports.updateProfile = async (user, updates) => {
    const allowedUpdates = ['name', 'email', 'phone'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        throw new Error('Invalid updates!');
    }

    updates.forEach((update) => (user[update] = updates[update]));
    await user.save();
    return user;
};