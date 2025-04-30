// server/controllers/courseController.js
const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can create courses' });
  }

  const { title, description, instructor, price } = req.body;
  console.log(req.body); // ✅ Add price here too!!

  try {
    const course = new Course({ title, description, instructor, price }); // ✅ Pass price also
    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};


