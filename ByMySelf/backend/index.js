import express from 'express'
import cors from 'cors'
import mysql from 'mysql'

const app = express()
app.use(express.json())
app.use(cors())


// base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bymyself"
})


app.listen (8800, () => {
    console.log("Server running on port 8800")}
)

app.get("/",(req,res)=>{
    res.json("Hello World from backend :D") 
})

app.post("/signup",(req,res)=>{

    const email = req.body.email
    const password = req.body.password

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result)=>{
        if(err){
            res.send(err)
        }
        if(result.length > 0){
            res.send("User already exists")
        }else{
            db.query("INSERT INTO users (email, password) VALUES (?,?)", [email, password], (err, result)=>{
                if(err){
                    res.send(err)
                }
                res.send("User created successfully")
            })
        }
    })
})

app.post ("/login",(req,res)=>{

    const email = req.body.email
    const password = req.body.password

    db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, data)=>{
        if(err){
            return res.json(err)
        }
        if(data.length > 0){
            return res.json("Success")
        }else{
            return res.send("User not found")
        }
    })
})