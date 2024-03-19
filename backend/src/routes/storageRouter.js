const express = require('express');
const router = express.Router();

const Stock = require('../models/stockModel');
const Product = require('../models/productModel');

router.get('/', async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
      } catch (error) {
        console.error('Error getting stock list:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
  });

router.get('/:id', async (req, res) => {
    try {
      const stock = await Stock.findOne({ lot: req.params.id });
      res.json(stock);
    } catch (error) {
      console.error('Error getting stock details:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.post('/', async (req, res) => {
    const { lot, quantity } = req.body;
  
    try {
      // Ürünü bul
      const product = await Product.findOne({ lot });
  
      // Eğer ürün bulunamazsa, hata döndür
      if (!product) {
        return res.status(404).json({ message: 'Product not found with the given lot number' });
      }
  
      // Eğer lot numarasına sahip bir ürün zaten varsa, stok miktarını güncelle
      let existingStock = await Stock.findOne({ lot });
      if (existingStock) {
        existingStock.quantity += quantity;
        await existingStock.save();
        return res.json({ message: 'Stock updated successfully', newStock: existingStock.quantity });
      }
  
      // Eğer lot numarasına sahip bir ürün yoksa, yeni bir stok oluştur
      const newStock = new Stock({ lot, quantity });
      await newStock.save();
  
      res.json({ message: 'Stock added successfully', newStock: newStock.quantity });
    } catch (error) {
      console.error('Error adding stock:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.post('/:id/increase', async (req, res) => {
    const { quantity } = req.body;
    const lot = req.params.id;
  
    try {
      let stock = await Stock.findOne({ lot });
  
      if (!stock) {
        // Eğer stok bulunamazsa, yeni bir stok oluştur
        stock = new Stock({ lot, quantity });
      } else {
        // Eğer stok varsa, miktarı artır
        stock.quantity += quantity;
      }
  
      await stock.save();
  
      res.json({ message: 'Stock increased successfully', newStock: stock.quantity });
    } catch (error) {
      console.error('Error increasing stock:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.post('/:id/decrease', async (req, res) => {
    const { quantity } = req.body;
    const lot = req.params.id;
  
    try {
      const stock = await Stock.findOne({ lot });
  
      if (!stock) {
        return res.status(404).json({ message: 'Stock not found for the lot' });
      }
  
      if (stock.quantity >= quantity) {
        stock.quantity -= quantity;
        await stock.save();
  
        res.json({ message: 'Stock decreased successfully', newStock: stock.quantity });
      } else {
        res.status(400).json({ message: 'Insufficient stock' });
      }
    } catch (error) {
      console.error('Error decreasing stock:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports = router;