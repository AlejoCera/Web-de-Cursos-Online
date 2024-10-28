const db = require('../db/db');

// Obtener todas las inscripciones
const getAllInscripciones = (req, res) => {
    const sql = 'SELECT * FROM inscripciones';
    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener las inscripciones' });
        }
        res.json(results);
    });
};

// Obtener una inscripción por PK_INSCRIPCION
const getInscripcionById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM inscripciones WHERE PK_INSCRIPCION = ?';
    db.query(sql, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener la inscripción' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Inscripción no encontrada' });
        }
        res.json(results[0]);
    });
};

// Crear una nueva inscripción
const createInscripcion = (req, res) => {
    const { FECHA, ESTADO, FK_USUARIO, FK_AULAVIRTUAL } = req.body;
    const sql = 'INSERT INTO inscripciones (FECHA, ESTADO, FK_USUARIO, FK_AULAVIRTUAL) VALUES (?, ?, ?, ?)';
    db.query(sql, [FECHA, ESTADO, FK_USUARIO, FK_AULAVIRTUAL], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error al crear la inscripción' });
        }
        res.status(201).json({ PK_INSCRIPCION: result.insertId, FECHA, ESTADO, FK_USUARIO, FK_AULAVIRTUAL });
    });
};

// Actualizar una inscripción existente
const updateInscripcion = (req, res) => {
    const { id } = req.params;
    const { FECHA, ESTADO, FK_USUARIO, FK_AULAVIRTUAL } = req.body;
    const sql = 'UPDATE inscripciones SET FECHA = ?, ESTADO = ?, FK_USUARIO = ?, FK_AULAVIRTUAL = ? WHERE PK_INSCRIPCION = ?';
    db.query(sql, [FECHA, ESTADO, FK_USUARIO, FK_AULAVIRTUAL, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error al actualizar la inscripción' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Inscripción no encontrada' });
        }
        res.json({ PK_INSCRIPCION: id, FECHA, ESTADO, FK_USUARIO, FK_AULAVIRTUAL });
    });
};

// Eliminar una inscripción
const deleteInscripcion = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM inscripciones WHERE PK_INSCRIPCION = ?';
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar la inscripción' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Inscripción no encontrada' });
        }
        res.json({ message: 'Inscripción eliminada' });
    });
};

module.exports = {
    getAllInscripciones,
    getInscripcionById,
    createInscripcion,
    updateInscripcion,
    deleteInscripcion
};