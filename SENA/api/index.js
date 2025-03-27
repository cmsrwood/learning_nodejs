const express = require('express')
const mysql = require("mysql2")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

app.use(cors())


app.use(bodyParser.json())

const PUERTO = 3000

const conexion = mysql.createConnection(
    {
        host: 'localhost',
        database: 'prueba',
        user: 'root',
        password: '',
    }

)

app.listen(PUERTO, () => {
    console.log(`Servidor ejecutandose en http://localhost:${PUERTO}`)
})


conexion.connect(error => {
    if (error) throw error
    console.log("Conexion Satisfactoria a MySQL")
})

app.get('/', (req, res) => {
    res.send('Mi Primer API  26 Marzo')
})

app.get('/api/usuarios/login', (req, res) => {
    res.send("Esta Api permite hacer Login")
})


app.get('/api/usuarios', (request, response) => {
    conexion.query("SELECT * FROM usuarios",
        (error, results) => {
            if (error)
                throw error;
            response.status(200).json(results);
        });
});


app.get('/api/usuarios/:id', (req, res) => {
    const { id } = req.params
    const query = `SELECT * FROM usuarios WHERE id_usuario=${id}`
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)

        if (resultado.length > 0) {
            console.log(resultado)
            res.json(resultado)

        } else {
            res.json('No hay registros con ese ID')

        }
    });
});

app.post('/api/usuarios/agregar/', (request, response) => {
    const { nombre, email, clave } = request.body;
    conexion.query("INSERT INTO usuarios(nombre, email, clave) VALUES (?,?,?)",
        [nombre, email, clave],
        (error, results) => {
            if (error)
                throw error;
            response.status(201).json({ message: "Item añadido correctamente" });
        });
});

app.delete('/api/usuarios/eliminar/:id', (req, res) => {
    const { id } = req.params; 
    const query = `DELETE FROM usuarios WHERE id_usuario = ?`;

    conexion.query(query, [id], (error, results) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ message: "Hubo un error al intentar eliminar el usuario." });
        }

        else if (results.affectedRows > 0) {
            res.json({ message: `Usuario con ID ${id} eliminado correctamente.` });
        } else {
            res.status(404).json({ message: `No se encontró un usuario con el ID ${id}.` });
        }
    });
});

app.put('/api/usuarios/actualizar/:id', (req, res) => {
    const { id } = req.params
    const { nombre, email, clave } = req.body;

    if (!nombre || !email || !clave) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const qUsuario = 'SELECT * FROM usuarios WHERE id_usuario = ?';

    conexion.query(qUsuario, [id], (error, results) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ message: "Hubo un error al intentar actualizar el usuario." });
        } else if (results.length === 0) {
            res.status(404).json({ message: `No se encontró un usuario con el ID ${id}.` });
        }
        else {
            const query = `UPDATE usuarios SET nombre = ?, email = ?, clave = ? WHERE id_usuario = ?`;

            conexion.query(query, [nombre, email, clave, id], (error, results) => {
                if (error) {
                    console.error(error.message);
                    return res.status(500).json({ message: "Hubo un error al intentar actualizar el usuario." });
                } else if (results.affectedRows > 0) {
                    res.json({ message: `Usuario con ID ${id} actualizado correctamente.` });
                } else {
                    res.status(404).json({ message: `No se encontró un usuario con el ID ${id}.` });
                }
            });
        }
    });
});