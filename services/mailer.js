const nodemailer = require('nodemailer');

/*const transporter = nodemailer.createTransport({
    host: 'gmail',
    auth: {
        user: 'Home2AirCorp@gmail.com',
        pass: 'Home2Air_Corp',
    },
});*/

var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "7d69d4c62fd921",
        pass: "00977f24e074ba"
    }
});

/*
const mailOptions = {
    from: 'votre_adresse_email',
    to: 'adresse_email_destinataire',
    subject: 'Sujet de l\'email',
    text: 'Contenu du message',
};*/

function sendMail(mailOptions){
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('E-mail envoyé : ' + info.response);
        }
    });

}

module.exports = sendMail;