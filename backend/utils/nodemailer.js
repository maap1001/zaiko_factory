const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'juanr7788@gmail.com', 
        pass: `${process.env.PASSWORDEMAIL}` 
    }
});

const sendEmail = async (to, subject, text) => {
    try {
        let info = await transporter.sendMail({
            to: to, // Dirección del destinatario
            subject: subject, // Asunto del correo
            text: text // Cuerpo del correo en texto plano
        });
        console.log('Correo enviado: %s', info.messageId);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};

module.exports = { sendEmail };
