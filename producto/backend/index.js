const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "productos"
})

db.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("MySQL connected")
    }
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("Hola mundo desde backend")
})

app.get("/productos", (req, res) => {
    db.query("SELECT * FROM productos", (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            res.send(data)
        }
    })
})

app.post("/subir", (req, res) => {
    const q = "INSERT INTO productos (`nombre`,`cantidad`,`precio1`,`precio2`, `total`) VALUES (?)"
    const values = [
        req.body.nombre,
        req.body.cantidad,
        req.body.precio1,
        req.body.precio2,
        req.body.cantidad * req.body.precio1
    ]
    db.query(q, [values], (err, data) => {
        if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).json("El producto se ha subido correctamente")
    })
})

app.delete("/productos/:id", (req, res) => {
    const productoId = req.params.id
    const q = "DELETE FROM productos WHERE id = ?"

    db.query(q, [productoId], (err, data) => {
        if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).json("El libro se ha eliminado correctamente")
    })
})

app.listen(8800, () => {
    console.log("Servidor corriendo en http://localhost:8800")
})   