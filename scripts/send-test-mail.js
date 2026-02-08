const { transporter, accountEmail } = require('../config/nodemailer.js');

async function main() {
  try {
    console.log('Verifying transporter...');
    await transporter.verify();
    console.log('Transporter verified. Sending test email...');

    const info = await transporter.sendMail({
      from: accountEmail,
      to: 'prashantkawadkar2407@gmail.com',
      subject: 'SMTP test — Subscription Tracker',
      text: 'This is a test message from your Subscription Tracker app.'
    });

    console.log('Email sent:', info.response || info);
    process.exit(0);
  } catch (err) {
    console.error('Error sending test email:', err && err.stack ? err.stack : err);
    process.exit(1);
  }
}

main();