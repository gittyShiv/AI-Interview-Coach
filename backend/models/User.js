const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  // Add more fields if you want (email, password hash, etc)
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);