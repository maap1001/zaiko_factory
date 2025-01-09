const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');
const upload = require('../utils/multer');
const middlewareAutenticacion = require('../utils/middleareAutenticacion');

router.get('/',middlewareAutenticacion, productosController.productos );
router.get('/obtenerCategoriaProveedor',middlewareAutenticacion, productosController.obtenerCategoriasYProveedores );
router.post('/crearProductos',middlewareAutenticacion,upload.single('imagen'), productosController.crearProductos );
router.get('/detalleProductos/:id',middlewareAutenticacion, productosController.detalleProductos );
router.post('/editarProductos/:id',middlewareAutenticacion,upload.single('imagen'), productosController.editarProductos );
router.post('/eliminarProductos/:id',middlewareAutenticacion, productosController.eliminarProductos );


module.exports = router;