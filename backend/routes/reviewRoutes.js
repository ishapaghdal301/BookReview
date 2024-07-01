const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Create a Review
router.post('/', reviewController.createReview);

// Get All Reviews with Pagination
router.get('/', reviewController.getAllReviews);

// Get a Single Review by ID
router.get('/:review_id', reviewController.getReviewById);

// Update a Review by ID
router.put('/:review_id', reviewController.updateReview);

// Delete a Review by ID
router.delete('/:review_id', reviewController.deleteReview);

module.exports = router;
