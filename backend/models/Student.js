const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  courseAppliedFor: { type: String, required: true },
  status: { type: String, default: 'Pending' }, 
  isAdmitted: { type: Boolean, default: false },
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);