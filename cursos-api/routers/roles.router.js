const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/roles.controller');

// Ruta para obtener todos los roles
router.get('/', rolesController.getAllRoles);

// Ruta para obtener un rol por ID
router.get('/:id', rolesController.getRolById);

// Ruta para crear un nuevo rol
router.post('/', rolesController.createRol);

// Ruta para actualizar un rol existente
router.put('/:id', rolesController.updateRol);

// Ruta para eliminar un rol
router.delete('/:id', rolesController.deleteRol);

module.exports = router;