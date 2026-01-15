const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title'],
    unique: true, // This ensures titles are unique
    trim: true
  },
  // --- ADD THIS SECTION ---
  slug: {
    type: String,
    unique: true
  },
  // ------------------------
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  duration: {
    type: String,
    required: [true, 'Please add duration']
  },
  fee: {
    type: String,
    required: [true, 'Please add fee']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);