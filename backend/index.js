const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const connectDB = require('./config/db');

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth' , authRoutes);
app.use('/reviews', reviewRoutes);
app.use('/books', bookRoutes);
app.use(express.static('public'));
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();


const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});