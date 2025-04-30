const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  title: String,
  filePath: String,
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Content', contentSchema);
