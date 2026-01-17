const express = require('express');
const router = express.Router();
const { getCourses, addCourse, deleteCourse } = require('../controllers/courseController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', getCourses);       // Anyone can see courses


router.post('/', protect, addCourse);       
router.delete('/:id', protect, deleteCourse);

module.exports = router;