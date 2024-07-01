const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const scrapeAndStoreBooks = require('../scraper/bookScraper');

// Endpoint to trigger web scraping
router.get('/scrape', async (req, res) => {
    try {
        await scrapeAndStoreBooks();
        res.status(200).json({ message: 'Scraping and storing books completed.' });
    } catch (error) {
        console.error('Error scraping books:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Endpoint to retrieve scraped book data with pagination
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    try {
        const books = await Book.find()
            .skip((page - 1) * size)
            .limit(size)
            .exec();
        res.status(200).json(books);
    } catch (error) {
        console.error('Error retrieving books:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
