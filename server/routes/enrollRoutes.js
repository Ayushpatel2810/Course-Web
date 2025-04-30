const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Course = require('../models/Course');
const User = require('../models/User');

// POST /api/enroll/:courseId
router.post('/:courseId', authMiddleware, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.enrolledCourses) user.enrolledCourses = [];

    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    res.json({ message: 'Enrolled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error enrolling', error: err.message });
  }
});

router.get('/my', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).populate('enrolledCourses');
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.json({ courses: user.enrolledCourses });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching my courses', error: err.message });
    }
  });
  router.post('/enroll', authMiddleware, async (req, res) => {
    const { courseId } = req.body;
    const userId = req.user._id;
  
    try {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.courses.includes(courseId)) {
        return res.status(400).json({ message: 'Already enrolled in this course' });
      }
  
      // Add the course to the user's enrolled courses
      user.courses.push(courseId);
      await user.save();
  
      res.status(200).json({ message: 'Enrolled successfully', course });
    } catch (err) {
      res.status(500).json({ message: 'Error enrolling in course', error: err.message });
    }
  });
module.exports = router;
