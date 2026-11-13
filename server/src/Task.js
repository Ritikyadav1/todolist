const { Schema, model } = require('mongoose');

module.exports = model('Task', new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  dueAt: { type: Date, required: true },
  endAt: { type: Date, default: null },
  priority: { type: String, enum: ['Low', 'Medium', 'High', null], default: null },
  status: { type: String, enum: ['In Progress', 'Completed'], default: 'In Progress' },
}, { timestamps: true }));
