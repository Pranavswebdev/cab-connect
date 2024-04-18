// controllers/reviewController.js
const reviewService = require('../services/reviewService');

exports.createReview = async (req, res) => {
    try {
        const review = await reviewService.createReview(req.body);
        res.status(201).send(review);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getReviews = async (req, res) => {
    try {
        const reviews = await reviewService.getReviews(req.user);
        res.send(reviews);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const review = await reviewService.getReviewById(req.params.id);
        res.send(review);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.updateReview = async (req, res) => {
    try {
        const updatedReview = await reviewService.updateReview(req.params.id, req.body);
        res.send(updatedReview);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.deleteReview = async (req, res) => {
    try {
        await reviewService.deleteReview(req.params.id);
        res.send({ message: 'Review deleted' });
    } catch (e) {
        res.status(400).send(e);
    }
};