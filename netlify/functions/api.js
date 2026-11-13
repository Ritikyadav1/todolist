require('dotenv').config();
const mongoose = require('mongoose');
const serverless = require('serverless-http');
const app = require('../../server/src/app');

let conn = null;

async function connectToDatabase() {
  if (conn && mongoose.connection.readyState === 1) {
    return conn;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todo';

  if (!conn) {
    conn = mongoose.connect(uri).catch((err) => {
      conn = null;
      throw err;
    });
  }

  return conn;
}

const handler = serverless(app, {
  // serverless-http hands over the raw body, which express.json() would skip
  request(req) {
    if (!Buffer.isBuffer(req.body)) return;
    try {
      req.body = JSON.parse(req.body.toString() || '{}');
    } catch {
      req.body = {};
    }
  },
});

exports.handler = async (event, context) => {
  if (context) {
    context.callbackWaitsForEmptyEventLoop = false;
  }

  try {
    await connectToDatabase();
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Database connection failed: ' + err.message }),
    };
  }

  return handler(
    {
      ...event,
      path: (event.path || '').replace('/.netlify/functions/api', '/api'),
    },
    context
  );
};
