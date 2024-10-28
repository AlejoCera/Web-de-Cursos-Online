const express = require('express');
const router = express.Router();
const inscripcionesController = require('../controllers/inscripciones.controller');

// Ruta para obtener todas las inscripciones
router.get('/', inscripcionesController.getAllInscripciones);

// Ruta para obtener una inscripción por ID
router.get('/:id', inscripcionesController.getInscripcionById);

// Ruta para crear una nueva inscripción
router.post('/', inscripcionesController.createInscripcion);

// Ruta para actualizar una inscripción existente
router.put('/:id', inscripcionesController.updateInscripcion);

// Ruta para eliminar una inscripción
router.delete('/:id', inscripcionesController.deleteInscripcion);

module.exports = router;