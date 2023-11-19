const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendTestEmail() {
    let transporter = nodemailer.createTransport({
        // service: 'gmail',
        host: 'smtp.web.de',
        port: 587,
        secure: false, // true für 465, false für andere Ports
    
        auth: {
            user: 'solu1122@web.de',
            pass: 'Hv9z:7Ld'
            // user: process.env.EMAIL_USER, // Umgebungsvariable für E-Mail-Adresse
            // pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });



    let mailOptions = {
        from: `"Gourmet Explorer"<solu1122@web.de>`, // Absenderadresse
        to: 's_lueg@yahoo.com', // Empfängeradresse
        subject: 'Test Email von Nodemailer', // Betreffzeile
        text: 'Das ist eine Test-E-Mail von Nodemailer.', // Plaintext body
        html: '<b>Das ist eine Test-E-Mail von Nodemailer.</b>' // HTML body
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

sendTestEmail();
