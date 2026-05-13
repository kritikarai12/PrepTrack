const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, branch, year, college } = req.body;

    if (!name || !email || !password || !branch || !year || !college) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      branch,
      year,
      college
    });

    await newStudent.save();

    const token = jwt.sign(
      { id: newStudent._id, email: newStudent.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      student: {
        id: newStudent._id,
        name: newStudent.name,
        email: newStudent.email,
        branch: newStudent.branch,
        year: newStudent.year,
        college: newStudent.college,
        skills: newStudent.skills,
        cgpa: newStudent.cgpa,
        offers: newStudent.offers
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        branch: student.branch,
        year: student.year,
        college: student.college,
        skills: student.skills,
        cgpa: student.cgpa,
        offers: student.offers
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/update', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { name, branch, year, college, cgpa, skills, offers } = req.body;

    const updated = await Student.findByIdAndUpdate(
      decoded.id,
      { name, branch, year, college, cgpa, skills, offers },
      { new: true }
    );

    res.json({
      message: 'Profile updated successfully',
      student: {
        id: updated._id,
        name: updated.name,
        email: updated.email,
        branch: updated.branch,
        year: updated.year,
        college: updated.college,
        skills: updated.skills,
        cgpa: updated.cgpa,
        offers: updated.offers
      }
    });

  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;