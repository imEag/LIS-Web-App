require('dotenv').config();

const express = require('express');
const expressConfig = require('./config/express');
const connectToDatabase = require('./config/database');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();

expressConfig(app);

// Start server
app.listen(PORT, async () => {
  // connect to database
  await connectToDatabase();

  // Enable CORS for all requests
  app.use(cors());

  // Routes
  routes(app);

  // error handling
  app.use(errorHandler);

  console.log(`🔥 Listening to port ${PORT}`);
});

module.exports = app;

