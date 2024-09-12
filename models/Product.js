const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  stock: {
    type: Number,
    default: 0,
  },
  category: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
