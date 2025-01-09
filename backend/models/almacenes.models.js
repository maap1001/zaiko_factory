const mongoose = require('../config/database');

const almacenesSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: [true, 'El código de ubicación es obligatorio'],
        unique: true,
        trim: true,
        minlength: [3, 'El código debe tener al menos 3 caracteres']
    },
    pasillo: {
        type: String,
        required: [true, 'El pasillo es obligatorio'],
        trim: true
    },
    seccion: {
        type: String,
        required: [true, 'La sección es obligatoria'],
        trim: true
    },
    estante: {
        type: Number,
        required: [true, 'El número de estante es obligatorio'],
        min: [1, 'El estante debe ser al menos 1']
    },
    nivel: {
        type: Number,
        required: [true, 'El nivel es obligatorio'],
        min: [1, 'El nivel debe ser al menos 1']
    },
    capacidad: {
        type: Number,
        required: [true, 'La capacidad es obligatoria'],
        min: [1, 'La capacidad debe ser al menos 1']
    },
    ocupacion: {
        type: Number,
        required: [true, 'La ocupación actual es obligatoria'],
        min: [0, 'La ocupación no puede ser negativa']
    },
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto', 
        required: false 
    },
}, { timestamps: true }); 

const almacenModel = mongoose.model("Almacen", almacenesSchema);
module.exports = almacenModel;
