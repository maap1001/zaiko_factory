const mongoose = require('../config/database');
const Schema = mongoose.Schema;

// Esquema de Pedidos
const pedidoSchema = new Schema({
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente', // Relación con el modelo de Cliente
        required: [true, 'El cliente es obligatorio']
    },
    productos: [{
        producto: {
            type: Schema.Types.ObjectId,
            ref: 'Producto', // Relación con el modelo de Producto
            required: [true, 'El producto es obligatorio']
        },
        cantidad: {
            type: Number,
            required: [true, 'La cantidad es obligatoria'],
            min: [1, 'La cantidad debe ser al menos 1']
        },
        precioUnitario: {
            type: Number,
            required: [true, 'El precio unitario es obligatorio'],
            min: [0, 'El precio debe ser un valor positivo']
        },
        subtotal: {
            type: Number,
            required: [true, 'El subtotal es obligatorio'],
            min: [0, 'El subtotal debe ser un valor positivo']
        }
    }],
    total: {
        type: Number,
        required: [true, 'El total del pedido es obligatorio'],
        min: [0, 'El total debe ser un valor positivo']
    },
    fechaPedido: {
        type: Date,
        default: Date.now, 
        required: [true, 'La fecha del pedido es obligatoria']
    },
    estado: {
        type: String,
        enum: ['pendiente', 'procesado', 'enviado', 'entregado', 'cancelado'],
        default: 'pendiente',
        required: true
    },
    direccionEntrega: {
        type: String,
        required: [true, 'La dirección de entrega es obligatoria'],
        trim: true
    },
    metodoPago: {
        type: String,
        enum: ['tarjeta', 'efectivo', 'transferencia'],
        required: [true, 'El método de pago es obligatorio']
    }
}, { timestamps: true });

const Pedido = mongoose.model('Pedido', pedidoSchema);
module.exports = Pedido;
