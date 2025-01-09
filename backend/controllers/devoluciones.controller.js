const productosModel = require('../models/productos.models');
const pedidosModel = require('../models/pedidos.models')

exports.devoluciones = async (req, res) => {
    try {
        const productos = await productosModel.find();
        res.render('admin/productos/productos', { productos });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al listar los productos", error: error.message }); 
    }
}