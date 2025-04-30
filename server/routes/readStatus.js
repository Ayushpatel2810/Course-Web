const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const ReadStatus = require('../models/ReadStatus');

// Mark a content as read
router.post('/mark', authenticate, async (req, res) => {
  const { courseId, contentId } = req.body;
  const userId = req.user.userId;

  try {
    let readStatus = await ReadStatus.findOne({ userId, courseId, contentId });

    if (!readStatus) {
      readStatus = new ReadStatus({ userId, courseId, contentId, read: true });
    } else {
      readStatus.read = true;
    }

    await readStatus.save();
    res.json({ message: 'Content marked as read.' });
  } catch (err) {
    console.error('Error marking as read:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get read status for a course
router.get('/status/:courseId', authenticate, async (req, res) => {
  const userId = req.user.userId;
  const { courseId } = req.params;

  try {
    const readStatuses = await ReadStatus.find({ userId, courseId, read: true }).select('contentId');
    const readContentIds = readStatuses.map(status => status.contentId);

    res.json(readContentIds);
  } catch (err) {
    console.error('Error fetching read statuses:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
