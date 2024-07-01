const Review = require('../models/Review');

// Create a Review
exports.createReview = async (req, res) => {
    const { book_id, rating, comment } = req.body;
    try {
        const newReview = new Review({ book_id, rating, comment });
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get All Reviews with Pagination
exports.getAllReviews = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    try {
        const reviews = await Review.find()
            .skip((page - 1) * size)
            .limit(size)
            .exec();
        res.status(200).json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a Single Review by ID
exports.getReviewById = async (req, res) => {
    const { review_id } = req.params;
    try {
        const review = await Review.findById(review_id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a Review by ID
exports.updateReview = async (req, res) => {
    const { review_id } = req.params;
    const { rating, comment } = req.body;
    try {
        const updatedReview = await Review.findByIdAndUpdate(
            review_id,
            { rating, comment },
            { new: true }
        );
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(updatedReview);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a Review by ID
exports.deleteReview = async (req, res) => {
    const { review_id } = req.params;
    try {
        const deletedReview = await Review.findByIdAndDelete(review_id);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(204).json(); // No content
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
