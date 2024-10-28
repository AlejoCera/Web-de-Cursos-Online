const express = require('express');
const router = express.Router();
const aulasVirtualesController = require('../controllers/aulasvirtuales.controller');

// Ruta para obtener todas las aulas virtuales
router.get('/', aulasVirtualesController.getAllAulasVirtuales);

// Ruta para obtener una aula virtual por ID
router.get('/:id', aulasVirtualesController.getAulaVirtualById);

// Ruta para crear una nueva aula virtual
router.post('/', aulasVirtualesController.createAulaVirtual);

// Ruta para actualizar una aula virtual existente
router.put('/:id', aulasVirtualesController.updateAulaVirtual);

// Ruta para eliminar una aula virtual
router.delete('/:id', aulasVirtualesController.deleteAulaVirtual);

module.exports = router;
