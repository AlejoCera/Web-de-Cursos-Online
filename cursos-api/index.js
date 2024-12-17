// Carga las variables de entorno
require('dotenv').config();

const express = require('express');
const path = require('path'); // Para manejar rutas fácilmente

// Server
const app = express();
const PORT = process.env.PORT || 3001

// Configuración para servir archivos estáticos.
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "pages/login.html"));
});

// Ruta para acceder al archivo IFTSAD24.html (para administradores)
app.get('/iftsad24', (req, res) => {
    res.sendFile(path.join(__dirname, "pages/IFTSAD24.html"));
});

// Ruta para acceder a la pantalla de login exitoso
app.get('/exitologin', (req, res) => {
    res.sendFile(path.join(__dirname, "pages/admin/admin.html"));
});

// Ruta para acceder al registro
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, "pages/register.html"));
});

// Ruta para acceder al home
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, "pages/index.html"));
});

const cursosRouter = require('./routers/cursos.router');
const categoriasRouter = require('./routers/categorias.router');
const rolesRouter = require('./routers/roles.router');
const aulasVirtualesRouter = require('./routers/aulasvirtuales.router');
const inscripcionesRouter = require('./routers/inscripciones.router');
const usuariosRouter = require('./routers/usuarios.router');
const authRouter = require('./routers/auth.router');

// Middleware para manejar JSON y archivos estáticos
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal para los cursos
app.use('/cursos', cursosRouter);

// Ruta principal para las categorías
app.use('/categorias', categoriasRouter);

// Ruta principal para los roles
app.use('/roles', rolesRouter);

// Ruta principal para las aulas virtuales
app.use('/aulasvirtuales', aulasVirtualesRouter);

// Ruta principal para las inscripciones
app.use('/inscripciones', inscripcionesRouter);

// Ruta principal para los usuarios
app.use('/usuarios', usuariosRouter);

// Ruta principal para la autenticación
app.use('/auth', authRouter);
