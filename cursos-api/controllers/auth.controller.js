const db = require('../db/db'); // Conexión a la base de datos
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Registrar nuevo usuario
const register = async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe en la base de datos
        const [userExists] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (userExists.length > 0) {
            return res.status(400).send('El usuario ya está registrado');
        }

        // Encriptar la contraseña
        const hash = bcrypt.hashSync(password, 8);

        // Obtener la fecha actual para el registro
        const fechaRegistro = new Date().toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'

        // Insertar el nuevo usuario en la base de datos
        const [result] = await db.query(
            'INSERT INTO usuarios (NOMBRE, EMAIL, CONTRASENA, FECHA_REGISTRO) VALUES (?, ?, ?, ?)',
            [nombre, email, hash, fechaRegistro]
        );

        const userId = result.insertId; // Obtener el id del nuevo usuario

        // Generar el token JWT
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Responder con el token
        res.status(201).send({ auth: true, token });

    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al registrar al usuario');
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario en la base de datos
        const [user] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (user.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        // Extraer el hash de la contraseña del resultado de la consulta
        const hashedPassword = user[0].CONTRASENA;

        // Comparar las contraseñas
        if (!hashedPassword) {
            return res.status(500).send('Error interno: contraseña no encontrada en la base de datos');
        }

        const passwordIsValid = bcrypt.compareSync(password, hashedPassword);

        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, token: null });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user[0].PK_USUARIO }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.send({ auth: true, token });

    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al iniciar sesión');
    }
};

module.exports = {
    register,
    login,
};