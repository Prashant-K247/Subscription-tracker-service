const { emailTemplates } = require('./email.utils.js');
const dayjs = require('dayjs');
const { transporter, accountEmail } = require('../config/nodemailer.js');

exports.sendReminderEmail = async ({ to, type, subscription }) => {
    if (!to || !type) {
        throw new Error('missing required parameter');
    }

    const template = emailTemplates.find((t) => t.key === type);
    if (!template) throw new Error('invalid email type');

    const mailInfo = {
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format('DD/MM/YYYY'),
        planName: subscription.name,
        price: `${subscription.price} ${subscription.currency} (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod || "Auto debit",
        accountSettingsLink: "#",
        supportLink: "#",
    };

    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    const mailOption = {
        from: accountEmail,
        to,
        subject,
        html: message,
    };

    const info = await transporter.sendMail(mailOption);

    console.log("Email sent", {
        to,
        subject,
        from: accountEmail,
        response: info.response,
    });

    return info;
};
