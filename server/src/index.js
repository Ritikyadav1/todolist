require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todo')
  .then(() => app.listen(process.env.PORT || 5000, () => console.log('api up')));
