const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/connectDB');
const cors = require('cors');
const Task = require('./models/taskModel');
const taskRoutes = require('./routes/taskRoute');
const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin:["http://localhost:3000","https://mern-task-app.onrender.com"]
}));

app.use('/api/tasks', taskRoutes);
// Routes
app.get('/', (req, res) => {
  res.send('Home Page');
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => console.log(error));

