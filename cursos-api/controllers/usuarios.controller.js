const db = require('../db/db');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
const getAllUsuarios = (req, res) => {
    const sql = 'SELECT * FROM usuarios';
    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los usuarios' });
        }
        res.json(results);
    });
};

// Obtener un usuario por ID
const getUsuarioById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM usuarios WHERE PK_USUARIO = ?';
    db.query(sql, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener el usuario' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un nuevo usuario
const createUsuario = (req, res) => {
    console.log(req.file); 
    let userimagen = "";
    
    if (req.file) {
        userimagen = req.file.filename; // Asigna el nombre del archivo subido
    }

    const { NOMBRE, EMAIL, CONTRASENA, FECHA_REGISTRO, FK_ROL } = req.body;
    //encriptación
    bcrypt.hash(CONTRASENA,10,(err,hashedPassword)=>{
        if (err){
            return res.status(500).send("Error de encriptación")
        }
        const sql = 'INSERT INTO usuarios (NOMBRE, EMAIL, CONTRASENA, FECHA_REGISTRO, FK_ROL, FOTO) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [NOMBRE, EMAIL, hashedPassword, FECHA_REGISTRO, FK_ROL, userimagen], (error, result) => {
        if (error) {
            console.error('Error:', error); // Imprime el error para obtener más información
            return res.status(500).json({ error: 'Error al crear el usuario' });
        }
        // Devolver todas las columnas del usuario creado en la respuesta
        res.status(201).json({ 
            id: result.insertId, 
            NOMBRE, 
            EMAIL,
            FECHA_REGISTRO, 
            FK_ROL, 
            FOTO: userimagen
        });
    });
    })
};


// Actualizar un usuario existente
const updateUsuario = (req, res) => {
    const { id } = req.params;
    const { NOMBRE, EMAIL, CONTRASENA, FECHA_REGISTRO, FK_ROL, FOTO } = req.body;
    const sql = 'UPDATE usuarios SET NOMBRE = ?, EMAIL = ?, CONTRASENA = ?, FECHA_REGISTRO = ?, FK_ROL = ?, FOTO = ? WHERE PK_USUARIO = ?';
    db.query(sql, [NOMBRE, EMAIL, CONTRASENA, FECHA_REGISTRO, FK_ROL, FOTO, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error al actualizar el usuario' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        // Devolver todas las columnas del usuario actualizado en la respuesta
        res.json({ 
            id, 
            NOMBRE, 
            EMAIL, 
            CONTRASENA, 
            FECHA_REGISTRO, 
            FK_ROL, 
            FOTO 
        });
    });
};

// Eliminar un usuario
const deleteUsuario = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM usuarios WHERE PK_USUARIO = ?';
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar el usuario' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado' });
    });
};

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
};