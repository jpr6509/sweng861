const mongoose = require('mongoose');

const uri = "mongodb+srv://jpr6509:HoneyBuns2024@cluster0.p35av.mongodb.net/user"; //Database name is "user"

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
