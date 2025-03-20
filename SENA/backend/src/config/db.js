const mysql = require('mysql');

const connectDB = async () => { 
    try {
        const connection = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'login',
            connectTimeout: 10000
        });

        console.log('Conexion exitosa a la base de datos');
        global.db = connection;
    } catch (error) { 
        console.log('Error al conectar a la base de datos: ', error);
        process.exit(1);
    }
}

module.exports = connectDB;