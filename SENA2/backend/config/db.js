const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root', // Cambia según tu configuración
  password: '', // Cambia según tu configuración
  database: 'proyecto_flutter'
});

module.exports = db;