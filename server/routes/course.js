const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { createCourse, getCourses } = require('../controllers/courseController');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/create', verifyToken,adminMiddleware, createCourse);
router.get('/', verifyToken, getCourses);

module.exports = router;
