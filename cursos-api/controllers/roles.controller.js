const db = require('../db/db');

// Obtener todos los roles
const getAllRoles = (req, res) => {
    const sql = 'SELECT * FROM roles';
    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los roles' });
        }
        res.json(results);
    });
};

// Obtener un rol por PK_ROL
const getRolById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM roles WHERE PK_ROL = ?';
    db.query(sql, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener el rol' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un nuevo rol
const createRol = (req, res) => {
    const { NOMBRE, DESCRIPCION } = req.body;
    const sql = 'INSERT INTO roles (NOMBRE, DESCRIPCION) VALUES (?, ?)';
    db.query(sql, [NOMBRE, DESCRIPCION], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error al crear el rol' });
        }
        res.status(201).json({ PK_ROL: result.insertId, NOMBRE, DESCRIPCION });
    });
};

// Actualizar un rol existente
const updateRol = (req, res) => {
    const { id } = req.params;
    const { NOMBRE, DESCRIPCION } = req.body;
    const sql = 'UPDATE roles SET NOMBRE = ?, DESCRIPCION = ? WHERE PK_ROL = ?';
    db.query(sql, [NOMBRE, DESCRIPCION, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error al actualizar el rol' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.json({ PK_ROL: id, NOMBRE, DESCRIPCION });
    });
};

// Eliminar un rol
const deleteRol = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM roles WHERE PK_ROL = ?';
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar el rol' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }
        res.json({ message: 'Rol eliminado' });
    });
};

module.exports = {
    getAllRoles,
    getRolById,
    createRol,
    updateRol,
    deleteRol
};
