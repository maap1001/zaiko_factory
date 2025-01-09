const express = require('express');
const router = express.Router();
const middlewareAutenticacion = require('../utils/middleareAutenticacion');
const graficosController = require('../controllers/graficos.controller');

router.get('/',middlewareAutenticacion, graficosController.graficos );

module.exports = router;