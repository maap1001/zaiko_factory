const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const schemaDevoluciones = new Schema({
    pedido: {
        type: Schema.Types.ObjectId,
        ref: 'pedido',
        required: true
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatoria']
    },
    motivo: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: [true, 'No existe la imagen o ruta']
    },
}, { timestamps: true }); 

const devolucionesModel = mongoose.model("devoluciones", schemaDevoluciones);
module.exports = devolucionesModel;
