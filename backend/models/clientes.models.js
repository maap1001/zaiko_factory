const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const schemaCliente = new Schema({
    nombre: {
        type: String,
        required: [true, 'Ingrese el nombre completo']
    },
    documento: {
        type: String,
        required: [true, 'Ingrese su documento'], 
        unique: true, 
        maxLength: [11, 'Ingrese un documento válido']
    },
    telefono: {
        type: String,
        required: true,
        trim: true,
        minLength: [9, 'El teléfono ingresado es muy corto'],
        maxLength: [14, 'El teléfono ingresado es muy extenso']
    },
    correo: {
        type: String,
        required: [true, 'Ingrese el correo'],
        match: [/.+@.+\..+/, 'Ingrese un correo electrónico válido'] 
    },
    direccion: {
        type: String,
        trim: true
    }
}, { timestamps: true }); 

const clienteModel = mongoose.model("cliente", schemaCliente);
module.exports = clienteModel;
