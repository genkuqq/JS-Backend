const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Veritabanına bağlandı.');
  } catch (error) {
    console.error('Veritabanına bağlanırken hata:', error);
  }
};

module.exports = connectDB;