const express = require('express');
const router = express.Router();
const { registerStudent, getStudents, updateStudentStatus, deleteStudent } = require('../controllers/admissionController');

// Import the Bouncer
const { protect } = require('../middleware/authMiddleware');

// Public Route (Anyone can apply)
router.post('/', registerStudent);

// Protected Routes (Only Admins can see/edit)
router.get('/', protect, getStudents);
router.put('/:id', protect, updateStudentStatus);
router.delete('/:id', protect, deleteStudent);

module.exports = router;