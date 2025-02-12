// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch(err => console.error(err));

const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});
const Todo = mongoose.model('Todo', TodoSchema);

app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const newTodo = new Todo({ text: req.body.text });
  const savedTodo = await newTodo.save();
  res.json(savedTodo);
});

app.put('/api/todos/:id', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTodo);
});

app.delete('/api/todos/:id', async (req, res) => {
  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
  res.json(deletedTodo);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor`));
