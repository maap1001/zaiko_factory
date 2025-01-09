const express = require('express');
const router = express.Router();
const middlewareAutenticacion = require('../utils/middleareAutenticacion');
const perfilUsuarioController = require('../controllers/perfilUsuario.controller');

router.get('/',middlewareAutenticacion, perfilUsuarioController.perfilUsuario );

module.exports = router;