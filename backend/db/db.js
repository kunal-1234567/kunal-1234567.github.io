
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    // Connect to local MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/splitzy', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(' MongoDB connected successfully');
  } catch (error) {
    console.error(' MongoDB connection error:', error);
    process.exit(1); // Exit process if DB connection fails
  }
}; 

module.exports = connectDB;
