exports.generateEmailTemplate = ({
    userName,
    subscriptionName,
    renewalDate,
    planName,
    price,
    paymentMethod,
    accountSettingsLink,
    supportLink,
    daysLeft,
}) => `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f7fa;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="background-color: #4a90e2; text-align: center;">
                <p style="font-size: 54px; line-height: 54px; font-weight: 800;">Subscription Reminder</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">                
                <p style="font-size: 16px; margin-bottom: 25px;">Hello <strong style="color: #4a90e2;">${userName}</strong>,</p>
                
                <p style="font-size: 16px; margin-bottom: 25px;">Your <strong>${subscriptionName}</strong> subscription is set to renew on <strong style="color: #4a90e2;">${renewalDate}</strong> (${daysLeft} days from today).</p>
                
                <table cellpadding="15" cellspacing="0" border="0" width="100%" style="background-color: #f0f7ff; border-radius: 10px; margin-bottom: 25px;">
                    <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                            <strong>Plan:</strong> ${planName}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                            <strong>Price:</strong> ${price}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px;">
                            <strong>Payment Method:</strong> ${paymentMethod}
                        </td>
                    </tr>
                </table>
                
                <p style="font-size: 16px; margin-bottom: 25px;">If you'd like to make changes or cancel your subscription, please visit respective site, before the renewal date.</p>
                
                <p style="font-size: 16px; margin-top: 30px;">Need help? <a href="${supportLink}" style="color: #4a90e2; text-decoration: none;">Contact our support team</a> anytime.</p>
                
                <p style="font-size: 16px; margin-top: 30px;">
                    Best regards,<br>
                    <strong>The SubDub Team</strong>
                </p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #f0f7ff; padding: 20px; text-align: center; font-size: 14px;">
                <p style="margin: 0 0 10px;">
                    SubDub Inc. | 123 Main St, Anytown, AN 12345
                </p>
                
            </td>
        </tr>
    </table>
</div>
`;

exports.emailTemplates = [
    {
        key: "subscription.reminder.7",
        label: "7 days before reminder",
        generateSubject: (data) =>
            `📅 Reminder: Your ${data.subscriptionName} renews in 7 days`,
        generateBody: (data) =>
            exports.generateEmailTemplate({ ...data, daysLeft: 7 }),
    },
    {
        key: "subscription.reminder.5",
        label: "5 days before reminder",
        generateSubject: (data) =>
            `⏳ ${data.subscriptionName} renews in 5 days`,
        generateBody: (data) =>
            exports.generateEmailTemplate({ ...data, daysLeft: 5 }),
    },
    {
        key: "subscription.reminder.2",
        label: "2 days before reminder",
        generateSubject: (data) =>
            `🚀 2 days left for ${data.subscriptionName}`,
        generateBody: (data) =>
            exports.generateEmailTemplate({ ...data, daysLeft: 2 }),
    },
    {
        key: "subscription.reminder.1",
        label: "1 day before reminder",
        generateSubject: (data) =>
            `⚡ Final reminder: ${data.subscriptionName} renews tomorrow`,
        generateBody: (data) =>
            exports.generateEmailTemplate({ ...data, daysLeft: 1 }),
    },
];
