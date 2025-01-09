const mongoose = require('../config/database');

const schemaCategorias = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        minlength: [5, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [50, 'El nombre no puede exceder los 50 caracteres'],
        unique: true,
        index: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
        maxlength: [200, 'La descripción no puede exceder los 200 caracteres']
    },
    presentacion: {
        type: String,
        required: [true, 'La presentación es obligatoria'],
        enum: ['frascos', 'bolsas', 'paquetes', 'cajas', 'pacas'], 
    },
}, { timestamps: true });

const categoriasModel = mongoose.model("Categoria", schemaCategorias);
module.exports = categoriasModel;
