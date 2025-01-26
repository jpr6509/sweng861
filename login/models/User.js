const mongoose = require('mongoose');

// Define the schema for storing user data
const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true }, // Unique Google ID
  name: { type: String, required: true },                  // User's name
  email: { type: String, required: true, unique: true },   // User's email
});

// Create and export the User model
module.exports = mongoose.model('User', userSchema);