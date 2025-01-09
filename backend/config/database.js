const mongoose = require('mongoose');
require('dotenv').config();

const URI = 'mongodb+srv://ZAIKO1001:3EZLC1vX9R1TeDxh@adso2669734.jbggoio.mongodb.net/zaiko?retryWrites=true&w=majority&appName=ADSO2669734'
mongoose.connect(URI);

module.exports = mongoose;