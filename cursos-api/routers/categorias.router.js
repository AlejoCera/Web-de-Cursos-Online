const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categorias.controller');

// Ruta para obtener todas las categorías
router.get('/', categoriasController.getAllCategorias);

// Ruta para obtener una categoría por ID
router.get('/:id', categoriasController.getCategoriaById);

// Ruta para crear una nueva categoría
router.post('/', categoriasController.createCategoria);

// Ruta para actualizar una categoría existente
router.put('/:id', categoriasController.updateCategoria);

// Ruta para eliminar una categoría
router.delete('/:id', categoriasController.deleteCategoria);

module.exports = router;
