
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://ishapaghdal:ishapaghdal@shipmnts.t8hxxip.mongodb.net/Shipmnts?retryWrites=true&w=majority');
        console.log('connected');
    }
    catch (err) {
        console.error(' Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

module.exports = connectDB;