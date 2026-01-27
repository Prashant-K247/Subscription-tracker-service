const { Router } = require("express");
const authorize = require("../middleware/auth.middleware.js");

const {
    createSubscription,
    deleteSubscription,
    getUserSubscriptions,
} = require("../Controllers/subscription.controller.js");

const subscriptionRouter = Router();

subscriptionRouter.get("/upcoming-renewals", authorize, (req, res) => res.send({ title: "get upcoming renewals subscription" }));

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);


subscriptionRouter.post("/", authorize, createSubscription);


subscriptionRouter.put("/:id", authorize, (req, res) => res.send({ title: "update subscription" }));


subscriptionRouter.delete("/:id", authorize, deleteSubscription);


subscriptionRouter.get("/:id", authorize, (req, res) => res.send({ title: "get particular subscription details" }));

module.exports = subscriptionRouter;
