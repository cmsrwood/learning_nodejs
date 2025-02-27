const nodemailer = require('nodemailer');

enviarMail = async () => {
    const config = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
            user: '@gmail.com',
            pass: ''
        }
    }
    const transporter = nodemailer.createTransport(config);

    const mensaje = {
        from: 'dilanfantas@gmail.com',
        to: 'fideljoseespi10@gmail.com',
        subject: 'Prueba de email nodemailer',
        text: 'Prueba de email compae'
    }
    
    const info = await transporter.sendMail(mensaje)

    console.log(info)
}
enviarMail();



