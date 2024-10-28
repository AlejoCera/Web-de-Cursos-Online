const express = require('express');
const app = express();
const cursosRouter = require('./routers/cursos.router');
const categoriasRouter = require('./routers/categorias.router');
const rolesRouter = require('./routers/roles.router');
const aulasVirtualesRouter = require('./routers/aulasvirtuales.router');
const inscripcionesRouter = require('./routers/inscripciones.router');

// Middleware para manejar JSON
app.use(express.json());

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

// Ruta principal
app.get('/', (req, res) => {
    res.send('API de cursos');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
