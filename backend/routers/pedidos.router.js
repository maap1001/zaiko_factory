const express = require('express');
const router = express.Router();
const middlewareAutenticacion = require('../utils/middleareAutenticacion');
const pedidosController = require('../controllers/pedidos.controller');

router.get('/', pedidosController.pedidos );

module.exports = router;