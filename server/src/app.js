const express = require('express');
const Task = require('./Task');

const app = express();
app.use(express.json());

app.get('/api/tasks', async (req, res) => res.json(await Task.find().sort({ dueAt: 1 })));

app.post('/api/tasks', async (req, res) => res.status(201).json(await Task.create(req.body)));

app.put('/api/tasks/:id', async (req, res) => {
  const t = await Task.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true });
  if (!t) return res.sendStatus(404);
  res.json(t);
});

app.delete('/api/tasks/:id', async (req, res) => {
  const t = await Task.findByIdAndDelete(req.params.id);
  res.sendStatus(t ? 204 : 404);
});

app.use((err, req, res, next) => {
  const bad = err.name === 'ValidationError' || err.name === 'CastError';
  res.status(bad ? 400 : 500).json({ error: err.message });
});

module.exports = app;
