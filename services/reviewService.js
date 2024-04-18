// services/reviewService.js
const Review = require('../models/Review');

exports.createReview = async ( reviewData) => {
    const review = new Review({
        userId: reviewData.userId,
        driverId: reviewData.driverId,
        rating: reviewData.rating,
        comment: reviewData.comment,
    });
    await review.save();
    return review;
};

exports.getReviews = async (user) => {
    const reviews = await Review.find({ userId: user._id });
    return reviews;
};

exports.getReviewById = async (id) => {
    const review = await Review.findById(id);
    if (!review) {
        throw new Error('Review not found');
    }
    return review;
};

exports.updateReview = async (id, updates) => {
    const review = await Review.findById(id);
    if (!review) {
        throw new Error('Review not found');
    }

    const allowedUpdates = ['rating', 'comment'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        throw new Error('Invalid updates!');
    }

    updates.forEach((update) => (review[update] = updates[update]));
    await review.save();
    return review;
};

exports.deleteReview = async (id) => {
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
        throw new Error('Review not found');
    }
};