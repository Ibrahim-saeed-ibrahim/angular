const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


let tasks = [];


app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});


app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: Date.now(),
    name: req.body.name,
    description: req.body.description || '',
    status: req.body.status || 'To Do',
    dueDate: req.body.dueDate || '',
    assignedUserId: req.body.assignedUserId || null
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});


app.put('/api/tasks/:id', (req, res) => {
  const taskId = Number(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body, id: taskId };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});


app.delete('/api/tasks/:id', (req, res) => {
  const taskId = Number(req.params.id);
  tasks = tasks.filter(t => t.id !== taskId);
  res.json({ message: 'Task deleted successfully', id: taskId });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});