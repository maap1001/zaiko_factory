const mongoose = require('../config/database');
const bcrypt = require('bcrypt');

const FACTOR_COMPLEJIDAD_HASH = 10;

const schemaUsuario = new mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: [true, 'Ingrese el nombre completo']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
        lowercase: true, 
        match: [/\S+@\S+\.\S+/, 'El correo ingresado no es válido'],  
    },
    contraseña: {
        type: String,
        required: [true, 'La contraseña es necesaria'],
        minLength: [8, 'La contraseña debe ser mínimo de 8 caracteres']
    },
    rol: {
        type: String,
        required: true,
        enum: ['admin', 'user'],  
        default: 'user',
    },
    foto: {
        type: String,
    },
    tokenRecuperarContraseña: {
        type: String,
    },
    expiracionToken: {
        type: Date,
    }
}, { timestamps: true }); 

schemaUsuario.pre('save', async function (continuar) {
    if (!this.isModified('contraseña')) return continuar();

    try {
        const salt = await bcrypt.genSalt(FACTOR_COMPLEJIDAD_HASH);
        this.contraseña = await bcrypt.hash(this.contraseña, salt);
        continuar(); 
    } catch (err) {
        continuar(err); 
    }
});

schemaUsuario.methods.compararContraseña = function (compararContraseña) {
    return bcrypt.compare(compararContraseña, this.contraseña);
};

const usuarioModel = mongoose.model("usuario", schemaUsuario);
module.exports = usuarioModel;
