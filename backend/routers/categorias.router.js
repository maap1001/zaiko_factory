const express = require('express');
const router = express.Router();
const middlewareAutenticacion = require('../utils/middleareAutenticacion');
const categoriasController = require('../controllers/categorias.controller');

router.get('/',middlewareAutenticacion, categoriasController.categorias);
router.post('/crearCategoria',middlewareAutenticacion, categoriasController.crearCategorias);
router.get('/detalleCategoria/:id',middlewareAutenticacion, categoriasController.detalleCategorias);
router.post('/editarCategoria/:id',middlewareAutenticacion, categoriasController.editarCategorias);
router.post('/eliminarCategoria/:id',middlewareAutenticacion, categoriasController.eliminarCategorias);

module.exports = router;
