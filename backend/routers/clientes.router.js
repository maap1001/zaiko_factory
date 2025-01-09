const express = require('express');
const router = express.Router();
const middlewareAutenticacion = require('../utils/middleareAutenticacion');
const clientesController = require('../controllers/clientes.controller');

router.get('/', clientesController.clientes );
router.post('/crearCliente', clientesController.crearClientes );
router.get('/detalleCliente/:id', clientesController.detalleClientes );
router.post('/editarCliente/:id', clientesController.editarClientes );
router.post('/eliminarCliente/:id', clientesController.eliminarClientes );

module.exports = router;