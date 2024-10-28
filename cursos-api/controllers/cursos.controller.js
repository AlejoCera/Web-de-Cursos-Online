const db = require('../db/db');

// Obtener todos los cursos
const getAllCursos = (req, res) => {
    const sql = 'SELECT * FROM cursos';
    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los cursos' });
        }
        res.json(results);
    });
};

// Obtener un curso por ID
const getCursoById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM cursos WHERE PK_CURSO = ?';
    db.query(sql, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener el curso' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }
        res.json(results[0]);
    });
};

// Crear un nuevo curso
const createCurso = (req, res) => {
    const { NOMBRE, DESCRIPCION, DURACION_HS, COSTO, FK_CATEGORIA } = req.body;
    const sql = 'INSERT INTO cursos (NOMBRE, DESCRIPCION, DURACION_HS, COSTO, FK_CATEGORIA) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [NOMBRE, DESCRIPCION, DURACION_HS, COSTO, FK_CATEGORIA], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error al crear el curso' });
        }
        res.status(201).json({ id: result.insertId, NOMBRE, DESCRIPCION, DURACION_HS, COSTO, FK_CATEGORIA });
    });
};

// Actualizar un curso
const updateCurso = (req, res) => {
    const { id } = req.params;
    const { NOMBRE, DESCRIPCION, DURACION_HS, COSTO, FK_CATEGORIA } = req.body;
    const sql = 'UPDATE cursos SET NOMBRE = ?, DESCRIPCION = ?, DURACION_HS = ?, COSTO = ?, FK_CATEGORIA = ? WHERE PK_CURSO = ?';
    db.query(sql, [NOMBRE, DESCRIPCION, DURACION_HS, COSTO, FK_CATEGORIA, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error al actualizar el curso' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }
        res.json({ id, NOMBRE, DESCRIPCION, DURACION_HS, COSTO, FK_CATEGORIA });
    });
};


// Eliminar un curso
const deleteCurso = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM cursos WHERE PK_CURSO = ?';
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar el curso' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }
        res.json({ message: 'Curso eliminado' });
    });
};

module.exports = {
    getAllCursos,
    getCursoById,
    createCurso,
    updateCurso,
    deleteCurso
};
