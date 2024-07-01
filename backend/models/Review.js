// models/Review.js

const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    book_id: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    // Add other fields as needed
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', ReviewSchema);
