const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // Obtén el token desde el encabezado de autorización
    const authHeader = req.headers["authorization"];

    // Si no hay un encabezado de autorización, devuelve un error
    if (!authHeader)
        return res
            .status(403)
            .send({ auth: false, message: "No se proveyó un token" });

    // Extrae el token del encabezado, normalmente es 'Bearer <token>'
    const token = authHeader.split(" ")[1];

    // Si el token no está presente, retorna un error
    if (!token)
        return res.status(403).send({ auth: false, message: "Token mal formado" });

    // Verifica el token usando la clave secreta
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error)
            return res
                .status(500)
                .send({ auth: false, message: "Error al autenticar el token." });

        // Si el token es válido, añade el ID del usuario a la solicitud (req.userId)
        req.userId = decoded.id;

        // Llama al siguiente middleware o ruta
        next();
    });
};
