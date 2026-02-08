const { transporter } = require('../config/nodemailer.js');

transporter.verify((err, success) => {
  if (err) {
    console.error('verify error', err);
    process.exit(1);
  }
  console.log('SMTP ready:', success);
  process.exit(0);
});