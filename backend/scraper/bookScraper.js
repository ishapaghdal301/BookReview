const axios = require('axios');
const cheerio = require('cheerio');
const Book = require('../models/Book');

const scrapeAndStoreBooks = async () => {
    try {
        const response = await axios.get('https://books.toscrape.com/catalogue/category/books/mystery_3/index.html');
        const html = response.data;
        
        const $ = cheerio.load(html);
        
        const book = $("article");
        const book_data = [];
        book.each(function(){
            title = $(this).find("h3 a").text();
            book_id = $(this).find("h3 a").text();
            price = $(this).find(".price_color").text();
            author = $(this).find("h3 a").text();
            book_data.push({title , price , author , book_id});
        })
        console.log(book_data);
        // const books = [];
        // $('.searchResultItem').each((index, element) => {
        //     const title = $(element).find('.booktitle a').text().trim();
        //     const bookUrl = $(element).find('.booktitle a').attr('href');
        //     const book_id = bookUrl.split('/').pop();
        //     const cover_image = $(element).find('.bookcover img').attr('src');
        //     const author = $(element).find('.bookauthor').text().replace('by', '').trim();
        //     const publishedYear = $(element).find('.publishedYear').text().trim();
        //     const editionsLink = $(element).find('.resultPublisher a').attr('href');
            
        //     books.push({ title, book_id, cover_image, author, publishedYear, editionsLink });
        // });

        // // Log books array for debugging
        // console.log(books);

        // Insert or update books in the database
        await Book.deleteMany({}); // Clear existing data
        await Book.insertMany(book_data);

        console.log('Scraping and storing books completed.');
    } catch (error) {
        console.error('Error scraping books:', error);
    }
};

module.exports = scrapeAndStoreBooks;
