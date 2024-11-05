const multer = require("multer");
const path = require("path");

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // La carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Agrega un timestamp al nombre del archivo
    },
});

// Inicializa Multer
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|jpeg|png/; // Tipos de archivos permitidos
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Tipo de archivo no soportado");
    },
    limits: { fileSize: 1024 * 1024 * 1 } // Tamaño máximo del archivo: 1MB
});

module.exports = upload; // Exporta la configuración