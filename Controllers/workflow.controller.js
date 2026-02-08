const { serve } = require("@upstash/workflow/express");
const dayjs = require("dayjs");
const Subscription = require("../models/subscription.model");
const { sendReminderEmail } = require("../utils/send-email");

const REMINDER_TYPE_MAP = {
    7: "subscription.reminder.7",
    5: "subscription.reminder.5",
    2: "subscription.reminder.2",
    1: "subscription.reminder.1",
};

const REMINDER_DAYS = [7, 5, 2, 1];

const dailyReminderWorkflow = async (context) => {
    console.log("Daily reminder workflow started");

    const today = dayjs().startOf("day");

    const subscriptions = await Subscription.find({
        status: "active",
        renewalDate: {
            $gte: today.toDate(),
            $lte: today.add(7, "day").endOf("day").toDate(),
        },
    }).populate("user", "email name");

    for (const sub of subscriptions) {
        const daysLeft = dayjs(sub.renewalDate).diff(today, "day");

        if (!REMINDER_DAYS.includes(daysLeft)) continue;

        const type = REMINDER_TYPE_MAP[daysLeft];

        if (!type) {
            console.warn("No email template for daysLeft:", daysLeft);
            continue;
        }

        await context.run(`send reminder ${daysLeft} days before`, async () => {
            try {
                await sendReminderEmail({
                    to: sub.user.email,
                    type,
                    subscription: sub,
                });
            } catch (err) {
                console.error("Failed to send reminder email", {
                    subscriptionId: sub._id,
                    daysLeft,
                    error: err.message,
                });
            }
        });

        console.log("Reminder processed", {
            subscriptionId: sub._id,
            daysLeft,
        });
    }

    console.log("Daily reminder workflow finished");
};

module.exports = {
    dailyReminder: serve(dailyReminderWorkflow),
    dailyReminderWorkflow,
};

// Express handler for creating a subscription (optional) and running the workflow
exports.reminderCreate = async (req, res, next) => {
    try {
        // If request contains subscription payload and user is authenticated, create it
        const payload = req.body || {};
        let createdSubscription = null;
        if (payload.name && payload.price && req.user) {
            const Subscription = require('../models/subscription.model');
            createdSubscription = await Subscription.create({
                name: payload.name,
                price: payload.price,
                currency: payload.currency || 'Rupee',
                frequency: payload.frequency || 'monthly',
                category: payload.category || 'general',
                payment: payload.payment || 'Auto debit',
                startDate: payload.startDate ? new Date(payload.startDate) : new Date(),
                renewalDate: payload.renewalDate ? new Date(payload.renewalDate) : undefined,
                user: req.user._id,
                status: 'active',
            });
        }

        // Run the workflow locally (non-QStash invocation)
        await dailyReminderWorkflow({ run: async (name, fn) => await fn() });

        res.status(200).json({ success: true, message: 'Subscription (optional) created and workflow executed', data: createdSubscription });
    } catch (err) {
        next(err);
    }
};

// Ensure `reminderCreate` is available on module.exports for route imports
module.exports.reminderCreate = exports.reminderCreate;
