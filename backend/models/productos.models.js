const mongoose = require('../config/database'); 
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        trim: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres']
    },
    foto: {
        type: String,
        trim: true
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio debe ser un valor positivo']
    },
    cantidad: {
        type: Number,
        required: [true, 'La cantidad es obligatoria'],
        min: [0, 'La cantidad no puede ser negativa']
    },
    fechaVencimiento: {
        type: Date
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true, 'La categoría es obligatoria']
    },
    proveedor: {
        type: Schema.Types.ObjectId,
        ref: 'Proveedor',
        required: [true, 'El proveedor es obligatorio']
    },
    estado: {
        type: String,
        enum: ['disponible', 'agotado'],
        default: 'disponible'
    }
}, { timestamps: true });

const Producto = mongoose.model('Producto', productoSchema);
module.exports = Producto;
