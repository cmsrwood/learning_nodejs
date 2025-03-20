const bcrypt = require('bcryptjs');
const ingresarRepository = require('../repository/loginRepository');

exports.registrar = async (usuario) => { 
    const response = await ingresarRepository.registrar(usuario);
    return response
}

exports.ingresar = async (usuario) => {
    const datos = await ingresarRepository.ingresar(usuario);

    if (!datos) { 
        throw new Error('El usuario no existe')
    }

    const match = await bcrypt.compare(usuario.password, datos.password);
    if (!match) { 
        throw new Error('Contraseña incorrecta')
    }

    return { 
        message: 'Ingreso exitoso',
        id: datos.id,
        nombre: datos.nombre,
        email: datos.email
    }
}