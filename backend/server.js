const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');

app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'PrepTrack API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`PrepTrack server running on port ${PORT}`);
});