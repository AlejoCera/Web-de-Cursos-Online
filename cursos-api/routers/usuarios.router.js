const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');
const upload = require('../multerConfig'); // Importa la configuración de Multer

// Ruta para obtener todos los usuarios
router.get('/', usuariosController.getAllUsuarios);

// Ruta para obtener un usuario por ID
router.get('/:id', usuariosController.getUsuarioById);

// Ruta para crear un nuevo usuario con carga de foto
router.post('/', upload.single('FOTO'), usuariosController.createUsuario); // 'FOTO' es el nombre del campo en el formulario

// Ruta para actualizar un usuario existente
router.put('/:id', usuariosController.updateUsuario);

// Ruta para eliminar un usuario
router.delete('/:id', usuariosController.deleteUsuario);

module.exports = router;
