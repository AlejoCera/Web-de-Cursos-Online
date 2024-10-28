const db = require('../db/db');

// Obtener todas las categorías
const getAllCategorias = (req, res) => {
    const sql = 'SELECT * FROM categorias';
    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener las categorías' });
        }
        res.json(results);
    });
};

// Obtener una categoría por PK_CATEGORIA
const getCategoriaById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM categorias WHERE PK_CATEGORIA = ?';
    db.query(sql, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener la categoría' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.json(results[0]);
    });
};

// Crear una nueva categoría
const createCategoria = (req, res) => {
    const { NOMBRE } = req.body;
    const sql = 'INSERT INTO categorias (NOMBRE) VALUES (?)';
    db.query(sql, [NOMBRE], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error al crear la categoría' });
        }
        res.status(201).json({ PK_CATEGORIA: result.insertId, NOMBRE });
    });
};

// Actualizar una categoría existente
const updateCategoria = (req, res) => {
    const { id } = req.params;
    const { NOMBRE } = req.body;
    const sql = 'UPDATE categorias SET NOMBRE = ? WHERE PK_CATEGORIA = ?';
    db.query(sql, [NOMBRE, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error al actualizar la categoría' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.json({ PK_CATEGORIA: id, NOMBRE });
    });
};

// Eliminar una categoría
const deleteCategoria = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM categorias WHERE PK_CATEGORIA = ?';
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar la categoría' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.json({ message: 'Categoría eliminada' });
    });
};

module.exports = {
    getAllCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria
};
