const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    lot:{type:String,required:true,unique: true},
    isim: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;