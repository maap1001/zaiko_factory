const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/proveedores.controller');
const middlewareAutenticacion = require('../utils/middleareAutenticacion');

router.get('/',middlewareAutenticacion, proveedoresController.proveedores );
router.post('/crearProveedor',middlewareAutenticacion, proveedoresController.crearProveedores );
router.get('/detalleProveedor/:id',middlewareAutenticacion, proveedoresController.detalleProveedores );
router.post('/editarProveedor/:id',middlewareAutenticacion, proveedoresController.editarProveedores );
router.post('/eliminarProveedor/:id',middlewareAutenticacion, proveedoresController.eliminarProveedores );

module.exports = router;