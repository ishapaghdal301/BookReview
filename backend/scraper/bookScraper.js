const axios = require('axios');
const cheerio = require('cheerio');
const Book = require('../models/Book');

const scrapeAndStoreBooks = async () => {
    try {
        const response = await axios.get('https://openlibrary.org/trending/daily');
        const html = response.data;
        
        // Log HTML content for debugging
        console.log(html);

        const $ = cheerio.load(html);
        
        const books = [];
        $('.edition-cover').each((index, element) => {
            const title = $(element).attr('title');
            const book_id = $(element).attr('href').split('/').pop();
            // const cover_image = $(element).find('img').attr('src');

            books.push({ title, book_id});
        });

        // Log books array for debugging
        console.log(books);

        // Insert or update books in the database
        await Book.deleteMany({}); // Clear existing data
        await Book.insertMany(books);

        console.log('Scraping and storing books completed.');
    } catch (error) {
        console.error('Error scraping books:', error);
    }
};

module.exports = scrapeAndStoreBooks;
