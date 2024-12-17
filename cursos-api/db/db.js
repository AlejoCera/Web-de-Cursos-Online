const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", 
    database: "cursosonline"
}).promise(); // .promise() habilita las promesas

connection.connect((error) => {
    if (error) {
        return console.error("Error conectando a la base de datos:", error);
    }
    console.log("Conectado a la base de datos.");
});

module.exports = connection;
