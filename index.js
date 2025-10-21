// Load environment variables
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
require('./database/dbConnection');

const pfserver = express(); // Server created

// CORS configuration for deployed frontend
// pfserver.use(cors({
//   origin: 'https://project-fair-nivy-app.netlify.app',
//   credentials: true
// }));

// Optional: Handle preflight requests
pfserver.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://project-fair-nivy-app.netlify.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

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