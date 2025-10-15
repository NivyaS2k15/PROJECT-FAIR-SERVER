// Load environment variables
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
require('./database/dbConnection');

const pfserver = express(); // Server created

// Define allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://project-fair-nivy-app.netlify.app'
];

// CORS configuration
pfserver.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Handle preflight requests
pfserver.options('*', cors());

// Middleware
pfserver.use(express.json());
pfserver.use(router);
pfserver.use('/uploads', express.static('./uploads'));

// Port setup
const PORT = process.env.PORT || 3000;

// Start server
pfserver.listen(PORT, () => {
  console.log(`PFSERVER IS RUNNING ON PORT ${PORT} AND WAITING FOR CLIENT REQUEST`);
});

// Test routes
pfserver.get('/', (req, res) => {
  res.status(200).send('<h1>my nivyaaa   something</h1>');
});

pfserver.post('/', (req, res) => {
  res.status(200).send("Post nivya Request");
});