const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGODB_URI; 

mongoose.connect(URI)
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

module.exports = mongoose;