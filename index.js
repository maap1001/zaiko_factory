const exp = require('express');
const backup = require('./backend/config/backup');
const cron = require('node-cron');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const router = require('./backend/routers/routers')
const verificarSesion = require('./backend/utils/middlewareVerificarSesion');
const app = exp();

app.use(logger('dev'))
app.set('view engine', 'ejs');
app.use(exp.urlencoded({ extended: true })); 
app.use(exp.json()); 
app.set('views', path.join(__dirname, 'frontend', 'views'));
app.use(exp.static(path.join(__dirname, 'frontend', 'static')));

// Configurar sesiones
app.use(session({
  secret: 'clave_secreta',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Ruta principal
app.get('/', (req, res) => {
  res.render('home/home'); 
});

//  Middleware de verificación de sesión para rutas protegidas
app.use(verificarSesion);

//Rutas protegidas
app.use("/v1", router);

//Middleware Multer
app.use('/uploads', exp.static(path.join(__dirname, '/uploads')));

//Middleware para manejar errores 404
app.use((req, res) => {
    res.status(404).render("404/404");
  });

// Programa el backup diario a la medianoche
cron.schedule('0  0 * * *', async () => {
  console.log('Realizando Backup de la Base de datos');
  await backup.backupDatabase();
});

//Puerto de eschuca servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`El servidor esta en el puerto http://localhost:${PORT}`);
});
