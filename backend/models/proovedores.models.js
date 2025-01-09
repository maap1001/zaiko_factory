const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proveedorSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre completo del proveedor es obligatorio'],
        trim: true,
        maxLength: [100, 'El nombre del proveedor no puede tener más de 100 caracteres']
    },
    documento: {
        type: String,
        required: [true, 'El documento de identificación es obligatorio'],
        unique: true,
        match: [/^\d+$/, 'El documento debe contener solo números'],
        maxLength: [11, 'El documento no puede tener más de 11 dígitos'],
    },
    telefono: {
        type: String,
        required: [true, 'El número de teléfono es obligatorio'],
        trim: true,
        match: [/^\d+$/, 'El teléfono debe contener solo números'],
        maxLength: [10, 'El teléfono es demasiado largo']
    },
    correo: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        trim: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'El formato del correo electrónico es inválido']
    },
    ubicacion: {
        direccion: { 
            type: String, 
            required: [true, 'La dirección es obligatoria'] 
        },
        ciudad: { 
            type: String, 
            required: [true, 'La ciudad es obligatoria'] 
        },
        departamento: { 
            type: String, 
            required: [true, 'El departamento es obligatorio'] 
        }
    },
    tipoEmpresa: {
        type: String,
        enum: ['Distribuidor', 'Fabricante', 'Comerciante'],
        required: [true, 'Seleccione el tipo de empresa']
    },
    metodoPago: {
        type: String,
        enum: ['Transferencia', 'Cheque', 'Tarjeta de crédito', 'Efectivo'],
        required: [true, 'Seleccione el método de pago preferido']
    },
}, { timestamps: true });

const Proveedor = mongoose.model('Proveedor', proveedorSchema);
module.exports = Proveedor;
