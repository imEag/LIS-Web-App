const mongoose = require('mongoose');

const URI = process.env.DB_URI;

async function connectToDatabase() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(URI);

    console.log('💻 Connected to database');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectToDatabase;
