const express = require('express');
const router = express.Router();
const panelGestionRouter = require('./panelGestion.router');
const proveedoresRouter = require('./proveedores.router');
const productosRouter = require('./productos.router');
const almacenesRouter = require('./almacenes.router');
const categoriasRouter = require('./categorias.router');
const clientesRouter = require('./clientes.router');
const devolucionesRouter = require('./devoluciones.router');
const pedidosRouter = require('./pedidos.router');
const auditoriaRouter = require('./auditoria.router');
const graficosRouter = require('./graficos.router');
const usuariosRouter = require('./usuarios.router');
const perfilUsuariosRouter = require('./perfilUsuario.router');
const inventarioRouter = require('./inventario.router');

router.use('/panelGestion', panelGestionRouter);

router.use('/proveedores', proveedoresRouter);

router.use('/productos', productosRouter);

router.use('/almacenes', almacenesRouter);

router.use('/categorias', categoriasRouter);

router.use('/clientes', clientesRouter);

router.use('/devoluciones', devolucionesRouter);

router.use('/pedidos', pedidosRouter);

router.use('/auditoria', auditoriaRouter);

router.use('/graficos', graficosRouter);

router.use('/usuarios', usuariosRouter);

router.use('/perfilUsuarios', perfilUsuariosRouter);

router.use('/inventario', inventarioRouter);

module.exports = router;
