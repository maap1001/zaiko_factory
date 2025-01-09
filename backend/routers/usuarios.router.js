const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');
const upload = require('../utils/multer');
const middlewareAutenticacion = require('../utils/middleareAutenticacion');

router.get('/',middlewareAutenticacion, usuariosController.usuarios );

router.post('/registroUsario', usuariosController.registroUsuarios );

router.get('/detalleUsario/:id',middlewareAutenticacion,usuariosController.detalleUsuarios );

router.post('/editarUsuario/:id',middlewareAutenticacion, upload.single('imagen'),usuariosController.editarUsuarios );

router.post('/eliminarUsuario/:id',middlewareAutenticacion, usuariosController.eliminarUsuarios );

router.post('/loginUsuario', usuariosController.loginUsuarios );

router.post('/logoutUsuario',middlewareAutenticacion, usuariosController.logoutUsuarios );

router.post('/solitarRecuperacionContrasena', usuariosController.recuperacionContraseñaUsuarios );

router.get('/restablecerContrasena/:token', usuariosController.formularioRestablecimientoContrasena );

router.post('/restablecerContrasena/:token', usuariosController.restablecerContraseñaUsuarios );

router.get('/rutasProtegidas', usuariosController.formularioRutasProtegidas );

module.exports = router;