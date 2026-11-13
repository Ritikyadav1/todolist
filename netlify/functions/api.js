const mongoose = require('mongoose');
const serverless = require('serverless-http');
const app = require('../../server/src/app');

// connects once per cold start, mongoose queues queries until it is ready
mongoose.connect(process.env.MONGODB_URI).catch(console.error);

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

// Netlify may pass either the original or the rewritten path
exports.handler = (event, context) =>
  handler({ ...event, path: event.path.replace('/.netlify/functions/api', '/api') }, context);
