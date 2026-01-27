const { Router } = require("express");
const { dailyReminder } = require("../Controllers/workflow.controller");

const workflowRouter = Router();

workflowRouter.post("/subscription/reminder", dailyReminder);

module.exports = workflowRouter;
