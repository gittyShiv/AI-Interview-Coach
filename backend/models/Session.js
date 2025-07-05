const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: { type: String, required: true }, // e.g., 'SDE', 'ML', etc.
  questions: [
    {
      question: String,
      answer: String,
      feedback: String,
      score: Number
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', SessionSchema);