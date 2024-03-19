const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  lot: { type: String, ref: 'Product', required: true }, // customId'yi string olarak kullanıyoruz
  quantity: { type: Number, default: 0 },
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;