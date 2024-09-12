const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB (you can later replace this with your MongoDB Atlas connection string)
mongoose.connect('mongodb://localhost:27017/my-webstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Test route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
