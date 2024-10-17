const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }

    console.log('MONGO_URI:', uri);  // Add this line for debugging

    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);  // Exit process with failure
  }
};

module.exports = connectDB;
