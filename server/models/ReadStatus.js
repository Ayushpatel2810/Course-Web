const mongoose = require('mongoose');

const readStatusSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  contentId: { type: mongoose.Schema.Types.ObjectId, required: true },
  read: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('ReadStatus', readStatusSchema);
