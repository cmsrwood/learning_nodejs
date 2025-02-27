const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const uniquid = require('uniqid');
const session = require('express-session');
const fs = require('fs');
const { BACKEND_PORT, DB_HOST, DB_USER, DB_PASS, DB_DATABASE, FRONTEND_URL } = require("./config.js");
const MySQLStore = require('express-mysql-session') (session);

const options = {
    host: DB_HOST,
    port: 3306,
    user: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE
}

const sessionStore = new MySQLStore(options)

const app = express()

const db = mysql.createConnection(options)

function eliminar (image) {
    fs.unlink(`../frontend/public/images/${image}`, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

app.use(express.json())
app.use(cors())
app.use (session ({
    key : 'cookie_usuario',
    secret: '123',
    store: sessionStore,
    resave : false,
    saveUninitialized : false,
}))


app.get("/",(req,res)=>{
    req.session.usuario = 'Juan Perez';
    req.session.rol = 'admin';
    req.session.visitas = req.session.visitas ? req.session.visitas + 1 : 1;
    console.log(req.session)
    res.send(`El usuario ${req.session.usuario} con el rol ${req.session.rol} ha visitado el sitio ${req.session.visitas} veces`)
})

app.get("/lugares",(req,res)=>{
    db.query("SELECT * FROM lugares",(err,data)=>{
        if(err){
            return res.json(err)
        }else{
            res.send(data)
        }
    })
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/public/images')
    },
    filename: (req, file, cb) => {
        const name = req.body.nombre.replace(/ /g, '_');
        const ext = file.originalname.split(".").pop()
        cb(null, `${name}_${Date.now()}.${ext}`);
    }
})

const upload = multer({storage: storage})

app.post('/lugares', upload.single('photo'), (req, res) => {
    const file = req.file;
    console.log('PHOTOS: ', file);
    console.log('LUGAR: ', req.body)
    const q = "INSERT INTO lugares ( `id`, `nombre`,`desco`, `photo`) VALUES (?)"
    const values = [
        uniquid(),
        req.body.nombre,
        req.body.desco,
        file.filename.toString()
    ]
    db.query(q,[values],(err)=>{
        if(err){
            console.log(err)
        }
        return res.json("El lugar se ha creado correctamente")
    })
})


    

app.delete("/lugares/:id",(req,res)=>{
    const lugarId = req.params.id
    const qimagen = "SELECT photo FROM lugares WHERE id = ?"
    db.query(qimagen,[lugarId],(err,data)=>{
        if(err){
            return res.json(err)
        }
        const imagen = data[0].photo
        eliminar(imagen)
    })
    const q = "DELETE FROM lugares WHERE id = ?"
    db.query(q,[lugarId],(err,data)=>{
        if(err){
            return res.json(err)
        }
        return res.json("El lugar se ha eliminado correctamente")
    })
})

app.get("/lugares/:id",(req,res)=>{
    const lugarId = req.params.id
    const q = "SELECT * FROM lugares WHERE id = ?"

    db.query(q,[lugarId],(err,data)=>{
        if(err){
            return res.json(err)
        }
        return res.send(data[0])
    })
})

app.put("/lugares/:id",(req,res)=>{
    const lugarId = req.params.id
    const q = "UPDATE lugares SET `nombre` = ?, `desco` = ? WHERE id = ?"
    const values = [
        req.body.nombre,
        req.body.desco,
    ]
    db.query(q,[...values,lugarId],(err,data)=>{
        if(err){
            return res.json(err)
        }
        res.json("El lugar se ha actualizado correctamente")
    })
})

app.listen(BACKEND_PORT, ()=>{
    console.log(`Backend server is running on port ${BACKEND_PORT} and frontend on ${FRONTEND_URL}`);
})   