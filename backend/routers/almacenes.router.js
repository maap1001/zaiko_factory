const express = require('express');
const router = express.Router();
const middlewareAutenticacion = require('../utils/middleareAutenticacion');
const almacenesController = require('../controllers/almacenes.controller');

router.get('/',middlewareAutenticacion, almacenesController.almacenes);
router.post('/crearAlmacen',middlewareAutenticacion, almacenesController.crearAlmacenes);
router.get('/detalleAlmacen/:id',middlewareAutenticacion, almacenesController.detalleAlmacenes);
router.post('/editarAlmacen/:id',middlewareAutenticacion, almacenesController.editarAlmacenes);
router.post('/eliminarAlmacen/:id',middlewareAutenticacion, almacenesController.eliminarAlmacenes);

module.exports = router;
