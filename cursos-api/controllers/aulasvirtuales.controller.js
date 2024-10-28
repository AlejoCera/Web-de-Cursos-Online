const db = require('../db/db');

// Obtener todas las aulas virtuales
const getAllAulasVirtuales = (req, res) => {
    const sql = 'SELECT * FROM aulasvirtuales';
    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener las aulas virtuales' });
        }
        res.json(results);
    });
};

// Obtener una aula virtual por ID
const getAulaVirtualById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM aulasvirtuales WHERE PK_AULAVIRTUAL = ?';
    db.query(sql, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener la aula virtual' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Aula virtual no encontrada' });
        }
        res.json(results[0]);
    });
};

// Crear una nueva aula virtual
const createAulaVirtual = (req, res) => {
    const { FK_USUARIO, FK_CURSO } = req.body;
    const sql = 'INSERT INTO aulasvirtuales (FK_USUARIO, FK_CURSO) VALUES (?, ?)';
    db.query(sql, [FK_USUARIO, FK_CURSO], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error al crear la aula virtual' });
        }
        res.status(201).json({ id: result.insertId, FK_USUARIO, FK_CURSO });
    });
};

// Actualizar una aula virtual existente
const updateAulaVirtual = (req, res) => {
    const { id } = req.params;
    const { FK_USUARIO, FK_CURSO } = req.body;
    const sql = 'UPDATE aulasvirtuales SET FK_USUARIO = ?, FK_CURSO = ? WHERE PK_AULAVIRTUAL = ?';
    db.query(sql, [FK_USUARIO, FK_CURSO, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error al actualizar la aula virtual' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Aula virtual no encontrada' });
        }
        res.json({ id, FK_USUARIO, FK_CURSO });
    });
};

// Eliminar una aula virtual
const deleteAulaVirtual = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM aulasvirtuales WHERE PK_AULAVIRTUAL = ?';
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar la aula virtual' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Aula virtual no encontrada' });
        }
        res.json({ message: 'Aula virtual eliminada' });
    });
};

module.exports = {
    getAllAulasVirtuales,
    getAulaVirtualById,
    createAulaVirtual,
    updateAulaVirtual,
    deleteAulaVirtual
};
