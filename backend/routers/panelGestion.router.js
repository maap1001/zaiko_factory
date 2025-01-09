const express = require('express');
const router = express.Router();
const penelGestinController = require('../controllers/panelGestion.controller');
const middlewareAutenticacion = require('../utils/middleareAutenticacion');

router.get('/',middlewareAutenticacion, penelGestinController.panelGestion );

module.exports = router;