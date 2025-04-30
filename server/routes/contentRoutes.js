const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/adminMiddleware');
const Content = require('../models/Content');

// Upload content
router.post('/upload', authMiddleware, adminMiddleware, upload.single('file'), async (req, res) => {
  const { courseId, title } = req.body;

  const newContent = new Content({
    courseId,
    title,
    filePath: req.file.path
  });

  await newContent.save();
  res.status(201).json({ message: 'Content uploaded', content: newContent });
});

// Fetch content by course ID
router.get('/:courseId', authMiddleware, async (req, res) => {
  const contents = await Content.find({ courseId: req.params.courseId });
  res.json(contents);
});

module.exports = router;
