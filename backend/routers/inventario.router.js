const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventario.controller');
const middlewareAutenticacion = require('../utils/middleareAutenticacion');

router.get('/',middlewareAutenticacion, inventarioController.inventario );
router.get('/obtenerProductoUbicacion',middlewareAutenticacion, inventarioController.obtenerProductosYUbicaciones );
router.post('/crearInventario',middlewareAutenticacion, inventarioController.crearInventario );
router.get('/detalleInventario/:id',middlewareAutenticacion, inventarioController.detalleInventario );
router.post('/editarInventario/:id',middlewareAutenticacion, inventarioController.editarInventario );
router.post('/eliminarInventario/:id',middlewareAutenticacion, inventarioController.eliminarInventario );

module.exports = router;