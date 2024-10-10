const express = require('express');
const router = express.Router();
const cursosController = require('../controllers/cursos.controller');

// Obtener todos los cursos
router.get('/', cursosController.getAllCursos);

// Obtener un curso por ID
router.get('/:id', cursosController.getCursoById);

// Crear un nuevo curso
router.post('/', cursosController.createCurso);

// Actualizar un curso por ID
router.put('/:id', cursosController.updateCurso);

// Eliminar un curso por ID
router.delete('/:id', cursosController.deleteCurso);

module.exports = router;
