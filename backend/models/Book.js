const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    book_id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    // author: {
    //     type: String,
    //     required: true
    // },
    cover_url: {
        type: String
    },
    description: {
        type: String
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

BookSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model('Book', BookSchema);