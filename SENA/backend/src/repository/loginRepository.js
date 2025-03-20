const bcrypt = require('bcryptjs');

exports.registrar = async (usuario) => {
    const hashPassword = bcrypt.hashSync(usuario.password, 10);
    return new Promise((resolve, reject) => {
        const q = 'INSERT INTO usuarios(nombre, apellido, email, password) VALUES (?, ?, ?, ?)';
        const values = [
            usuario.nombre,
            usuario.apellido,
            usuario.email,
            hashPassword
        ];
        global.db.query(q, values, (err, results) => { 
            if (err) {
                reject(err);
            } else {
                resolve({
                    message: 'Usuario registrado exitosamente'
                });
            }
        })
    })
}

exports.ingresar = async (usuario) => { 
    return new Promise((resolve, reject) => { 
        const q = 'SELECT * FROM usuarios WHERE email = ?'; 
        const values = [
            usuario.email
        ];
        global.db.query(q, values, (err, results) => { 
            if (err) {
                reject(err);
            } else {
                resolve(results[0]);
            }
        })
    })
}