const pedidosModel = require('../models/pedidos.models');
const clientesModel = require('../models/clientes.models')
const productosModel = require('../models/productos.models')

exports.pedidos = async (req, res) => {
    try {
        const pedidos = await productosModel.find();
        res.render('admin/pedidos/pedidos', { pedidos });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al listar los pedidos", error: error.message }); 
    }
}