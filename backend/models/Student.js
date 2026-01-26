const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },      
  fatherName: { type: String, required: true },       
  age: { type: String, required: true, min: [0, "Age must be valid"], max: [100, "Age threshold is 100 years"] },              
  gender: { type: String, required: true },          
  address: { type: String, required: true },         
  phone: { type: String, required: true },            
  courseAppliedFor: { type: String, required: true }, 
  status: { type: String, default: 'Pending' }, 
  isAdmitted: { type: Boolean, default: false },
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);