const mongoose = require('../config/database');

const inventarioSchema = new mongoose.Schema({
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',  
        required: true
    },
    cantidad: {
        type: Number,
        required: true,
        min: 0
    },
    ubicacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Almacen', 
        required: true
    }
}, { timestamps: true }); 

const Inventario = mongoose.model('Inventario', inventarioSchema);

module.exports = Inventario;
