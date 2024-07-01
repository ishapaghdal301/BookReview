const cron = require('node-cron');
const axios = require('axios');
const scrapeAndStoreBooks = require('../scraper/bookScraper');

// Cron job schedule (runs every day at midnight)
cron.schedule('0 0 * * *', async () => {
    console.log('Running daily book scraping job...');

    try {
        await scrapeAndStoreBooks();
        console.log('Daily book scraping job completed.');
    } catch (error) {
        console.error('Error running daily book scraping job:', error);
    }
}, {
    timezone: 'Asia/Kolkata' 
});

console.log('Book scraping scheduler started.');

