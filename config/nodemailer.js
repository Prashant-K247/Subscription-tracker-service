const nodemailer = require('nodemailer');
const { EMAIL_PASSWORD } = require('./env.js');


const accountEmail = 'prshant247@gmail.com';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: accountEmail,
        pass: EMAIL_PASSWORD,
    }
});

module.exports = { transporter, accountEmail };
