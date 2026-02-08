const { Router } = require("express");
const authorize = require("../middleware/auth.middleware.js");
const { dailyReminder, dailyReminderWorkflow, reminderCreate } = require("../Controllers/workflow.controller");

const workflowRouter = Router();

// Upstash-signed endpoint (keep for production Upstash workflow calls)
workflowRouter.post("/subscription/reminder", dailyReminder);

// Authenticated endpoint that can create a subscription (optional) and run the workflow locally
workflowRouter.post("/subscription/reminder-create", authorize, reminderCreate);

// Test endpoint - bypasses QStash authentication (keeps previous behavior)
workflowRouter.post("/subscription/reminder-test", async (req, res) => {
    try {
        await dailyReminderWorkflow({
            run: async (name, fn) => await fn(),
        });
        res.json({ success: true, message: "Workflow executed successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = workflowRouter;
