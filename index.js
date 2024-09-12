const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection (already done)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));

// Route to get all products
app.get('/products', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error.message); // Log error message to Heroku logs
      res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
  });
  

// Route to create a new product
app.post('/products', async (req, res) => {
  const { name, price, description, stock, category } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      stock,
      category
    });
    await newProduct.save();
    res.status(201).json(newProduct); // 201: Created
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
