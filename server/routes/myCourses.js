const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const User = require('../models/User');

// ✅ Only '/' here (NOT '/api/my-courses')
router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('enrolledCourses');
  
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.enrolledCourses);
  } catch (err) {
    console.error('Error fetching enrolled courses:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

