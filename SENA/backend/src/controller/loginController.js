const loginServices = require('../services/loginServices');

exports.registrar = async (req, res, next) => { 
    try {
        const usuario = req.body;
        const response = await loginServices.registrar(usuario);
        res.status(200).json(response);
    } catch (error) { 
        next(error);
    }
}    

exports.ingresar = async (req, res, next) => {
    const { email, password} = req.body;
    try {
        const response = await loginServices.ingresar({email, password})
        res.status(200).json(response);
    } catch (error) { 
        next(error);
    }
}