const express = require('express');
const router = express.Router();
const middlewareAutenticacion = require('../utils/middleareAutenticacion');
const auditoriaController = require('../controllers/auditoria.controller');


router.get('/',middlewareAutenticacion, auditoriaController.auditoria );

module.exports = router;