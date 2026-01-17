const Student = require('../models/Student');
// @desc    Register a new student (Admission Form)
// @route   POST /api/admissions
exports.registerStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, courseAppliedFor } = req.body;

    // 1. COMPOUND CHECK
    const existingApplication = await Student.findOne({ 
      email: email, 
      courseAppliedFor: courseAppliedFor 
    });

    if (existingApplication) {
      return res.status(400).json({ 
        message: `You have already applied for ${courseAppliedFor} with this email.` 
      });
    }

    // 2. Create new admission record
    const student = await Student.create({
      firstName,
      lastName,
      email, 
      phone,
      courseAppliedFor,
      status: 'Pending'
    });

    res.status(201).json({
      _id: student._id,
      firstName: student.firstName,
      phone: student.phone, // Sending phone back for WhatsApp button
      courseAppliedFor: student.courseAppliedFor,
      message: 'Application Submitted Successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all students (For Admin)
// @route   GET /api/admissions
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 }); // Newest first
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update student status (Approve/Reject)
// @route   PUT /api/admissions/:id
exports.updateStudentStatus = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (student) {
      // 1. Update the text status ('Approved' or 'Rejected')
      student.status = req.body.status;
      
      // 2. Update the boolean flag
      student.isAdmitted = (req.body.status === 'Approved');

      const updatedStudent = await student.save();
      res.json(updatedStudent);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Delete a student application
// @route   DELETE /api/admissions/:id
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      await student.deleteOne();
      res.json({ message: 'Application removed' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};