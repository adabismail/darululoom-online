const Course = require('../models/Course');
const slugify = require('slugify'); // <--- Import this

// @desc    Get all courses (Public)
// @route   GET /api/courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new course (Admin only)
// @route   POST /api/courses
exports.addCourse = async (req, res) => {
  try {
    console.log("--- START ADD COURSE ---"); // Log 1
    const { title, description, duration, fee } = req.body;
    
    console.log("Title received:", title); // Log 2

    const slug = slugify(title, { lower: true, strict: true });
    console.log("Generated Slug:", slug); // Log 3

    const course = await Course.create({ 
      title, 
      description, 
      duration, 
      fee,
      slug 
    });

    res.status(201).json(course);
  } catch (error) {
    console.error("--- ERROR IN ADD COURSE ---");
    console.error(error); // This will print the REAL error details
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a course (Admin only)
// @route   DELETE /api/courses/:id
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      await course.deleteOne();
      res.json({ message: 'Course removed' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
