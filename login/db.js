const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/user"; //Database name is "user"

// Connect to MongoDB using Mongoose
async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Could not connect to MongoDB", err);
    process.exit(1);
  }
}

module.exports = { connectDB };
