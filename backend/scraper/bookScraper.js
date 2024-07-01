const axios = require('axios');
const Book = require('../models/Book'); // Adjust the path and model name as needed

const scrapeAndStoreBooks = async () => {
    try {
        const response = await axios.get('https://openlibrary.org/trending/daily');
        const data = response.data;

        const books = data.works || [];

        if (books.length === 0) {
            console.log('No books found.');
            return;
        }

        // Clear existing data
        await Book.deleteMany({});

        // Process each book and prepare for insertion
        const bookDocuments = books.map(book => ({
            book_id: book.cover_edition_key,
            title: book.title,
            author: book.author_name ? book.author_name.join(', ') : 'Unknown'
        }));

        // Insert new data into the database
        await Book.insertMany(bookDocuments);

        console.log('Scraping and storing books completed.');
    } catch (error) {
        console.error('Error scraping books:', error);
    }
};

module.exports = scrapeAndStoreBooks;
