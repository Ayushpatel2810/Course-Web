const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  price: { type: Number, required: true }, // ✅ Add this line for price
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);

