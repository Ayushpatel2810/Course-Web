const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const enrollRoutes = require('./routes/enrollRoutes');
const contentRoutes = require('./routes/contentRoutes');
const myCoursesRoutes = require('./routes/myCourses');
const stripeRoutes = require('./routes/stripe');
const readStatusRoutes = require('./routes/readStatus');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send("LMS Backend Running"));
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enroll', enrollRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/my-courses', myCoursesRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/read-status', readStatusRoutes);



app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
