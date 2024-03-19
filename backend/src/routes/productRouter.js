const express = require("express")
const router = express.Router()


const Product = require('../models/productModel');


// GET /products - get product list
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error getting product list:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET /products/:id - get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ lot: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error getting product by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST /products - add a new product
router.post('/', async (req, res) => {
  const productData = req.body;

  try {
    // Create a new product using the Product model
    const newProduct = new Product(productData);

    // Save the new product to the database
    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully', insertedId: newProduct._id });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router