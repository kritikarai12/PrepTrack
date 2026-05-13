const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  college: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    default: []
  },
  cgpa: {
    type: String,
    default: ''
  },
  offers: {
    type: Array,
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);