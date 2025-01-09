const express = require('express');
const router = express.Router();
const middlewareAutenticacion = require('../utils/middleareAutenticacion');
const devolucionesController = require('../controllers/devoluciones.controller');

router.get('/', devolucionesController.devoluciones );

module.exports = router;