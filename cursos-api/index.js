const express = require('express');
const app = express();
const cursosRouter = require('./routers/cursos.router');

// Middleware para manejar JSON
app.use(express.json());

// Ruta principal para los cursos
app.use('/cursos', cursosRouter);

// Ruta principal
app.get('/', (req, res) => {
    res.send('API de cursos');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
