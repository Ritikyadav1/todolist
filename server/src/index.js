require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todo';
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URI)
  .then(() => {
    const isAtlas = MONGODB_URI.includes('mongodb+srv://');
    console.log(`Connected to MongoDB (${isAtlas ? 'Atlas' : 'Local'})`);
    app.listen(PORT, () => console.log(`API server listening on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
