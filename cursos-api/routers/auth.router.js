const express = require('express');
const router = express.Router();

/// AUTH ///
const authController = require('../controllers/auth.controller'); // Controlador con la lógica de register y login
const authMiddleware = require('../middleware/auth.middleware'); // Middleware para protección de rutas

//// RUTAS AUTH ////
router.post('/register', authController.register); 
router.post('/login', authController.login);        

// Ruta protegida que solo puede acceder quien esté autenticado
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).send(`Hola usuario ${req.userId}`);
});

module.exports = router;
