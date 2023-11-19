const nodemailer = require('nodemailer');

async function sendResetEmail(userEmail, resetToken) {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'solu1122@web.de',
            pass: 'Hv9z:7Ld'
            // user: process.env.EMAIL_USER, // Umgebungsvariable für E-Mail-Adresse
            // pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: `"Gourmet Explorer"<solu1122@web.de>`, // Absenderadresse
        to: userEmail, // Empfängeradresse
        subject: 'Password Reset', // Betreffzeile
        text: `You requested a password reset. Please use the following link to set a new password: http://localhost:5173/login/resetpassword/${resetToken}`, // plaintext body
        html: `<b>You requested a password reset. Please use the following link to set a new password:</b> <a href="http://localhost:5173/login/resetpassword/${resetToken}">Reset Password</a>` // HTML body
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = { sendResetEmail };
