const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const progressData = [];

router.post('/save', authMiddleware, (req, res) => {
  try {
    const { section, topicId, status } = req.body;
    const studentId = req.student.id;

    if (!section || !topicId) {
      return res.status(400).json({ message: 'Section and topicId are required' });
    }

    const existingIndex = progressData.findIndex(
      p => p.studentId === studentId &&
           p.section === section &&
           p.topicId === topicId
    );

    if (existingIndex !== -1) {
      progressData[existingIndex].status = status;
      progressData[existingIndex].updatedAt = new Date();
    } else {
      progressData.push({
        id: progressData.length + 1,
        studentId,
        section,
        topicId,
        status: status || 'done',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    res.json({ message: 'Progress saved successfully' });

  } catch (error) {
    console.error('Save progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/get', authMiddleware, (req, res) => {
  try {
    const studentId = req.student.id;

    const studentProgress = progressData.filter(
      p => p.studentId === studentId
    );

    const grouped = {
      dsa: [],
      aptitude: [],
      core: []
    };

    studentProgress.forEach(p => {
      if (grouped[p.section]) {
        grouped[p.section].push(p.topicId);
      }
    });

    res.json({ progress: grouped });

  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/stats', authMiddleware, (req, res) => {
  try {
    const studentId = req.student.id;

    const studentProgress = progressData.filter(
      p => p.studentId === studentId && p.status === 'done'
    );

    const dsaDone = studentProgress.filter(p => p.section === 'dsa').length;
    const aptitudeDone = studentProgress.filter(p => p.section === 'aptitude').length;
    const coreDone = studentProgress.filter(p => p.section === 'core').length;

    const dsaTotal = 12;
    const aptitudeTotal = 19;
    const coreTotal = 7;

    const dsaPct = Math.round((dsaDone / dsaTotal) * 100);
    const aptitudePct = Math.round((aptitudeDone / aptitudeTotal) * 100);
    const corePct = Math.round((coreDone / coreTotal) * 100);

    const overallScore = Math.round((dsaPct + aptitudePct + corePct) / 3);

    res.json({
      stats: {
        dsa: { done: dsaDone, total: dsaTotal, percent: dsaPct },
        aptitude: { done: aptitudeDone, total: aptitudeTotal, percent: aptitudePct },
        core: { done: coreDone, total: coreTotal, percent: corePct },
        overallScore
      }
    });

  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;