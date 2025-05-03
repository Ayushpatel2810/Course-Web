const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { createCourse, getCourses } = require('../controllers/courseController');
const adminMiddleware = require('../middleware/adminMiddleware');
const Course = require('../models/Course');
const mongoose = require('mongoose');



router.post('/create', verifyToken,adminMiddleware, createCourse);
router.get('/', verifyToken, getCourses);

router.delete('/:courseId',verifyToken,adminMiddleware , async (req, res) => {
const { courseId } = req.params  //console.log("delete course id",_id);
  //  Only allow admins
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
   if (!courseId || courseId === 'undefined') {
      return res.status(400).json({ message: 'Invalid course ID' });
    }
  try {
    const course = await Course.findByIdAndDelete(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
     console.error('❌ Error deleting course:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
