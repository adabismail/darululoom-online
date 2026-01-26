const express = require('express');
const router = express.Router();
const { getCourses, addCourse, deleteCourse, updateCourse } = require('../controllers/courseController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', getCourses);       // Anyone can see courses


router.post('/', protect, addCourse);       
router.delete('/:id', protect, deleteCourse);
router.put('/:id', protect, updateCourse);

module.exports = router;