const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`[MongoDB Atlas] Connected successfully: ${conn.connection.host} (${conn.connection.name})`);
  } catch (error) {
    console.error(`[MongoDB Atlas] Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
