const nodemailer = require('nodemailer');

async function sendResetEmail(userEmail, resetToken) {
    let transporter = nodemailer.createTransport({
        service: 'Gmail', // Sie können jeden beliebigen SMTP-Service verwenden
        auth: {
            user: process.env.EMAIL_USER, // Umgebungsvariable für E-Mail-Adresse
            pass: process.env.EMAIL_PASS  // 
            // user: 'your-email@gmail.com', // Ihre E-Mail-Adresse
            // pass: 'your-email-password' // Ihr E-Mail-Passwort
        }
    });

    let mailOptions = {
        from: '"Your App Name" <your-email@gmail.com>', // Absenderadresse
        to: userEmail, // Empfängeradresse
        subject: 'Password Reset', // Betreffzeile
        text: `You requested a password reset. Please use the following link to set a new password: http://yourapp.com/resetpassword/${resetToken}`, // plaintext body
        html: `<b>You requested a password reset. Please use the following link to set a new password:</b> <a href="http://yourapp.com/resetpassword/${resetToken}">Reset Password</a>` // HTML body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}
