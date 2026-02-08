const Subscription = require("../models/subscription.model.js");
const { workflowClient } = require("../config/upstash.js");
const { SERVER_URL } = require("../config/env.js");

/**
 * CREATE SUBSCRIPTION
 * Only logged-in user can create
 * Ownership is enforced server-side
 */
exports.createSubscription = async (req, res, next) => {
    try {
        // ❌ Never trust user from client
        const { user, ...payload } = req.body || {};

        const subscription = await Subscription.create({
            ...payload,
            user: req.user._id, // ✅ logged-in user
            status: "active",
        });

        // Do not auto-trigger the workflow here. Workflow should be invoked explicitly.

        res.status(201).json({
            success: true,
            data: subscription,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * GET LOGGED-IN USER SUBSCRIPTIONS
 * Returns only active (non-expired) subscriptions
 */
exports.getUserSubscriptions = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const subscriptions = await Subscription.find({
            user: userId,
            status: "active",
            renewalDate: { $gte: new Date() }, // 🔥 exclude expired
        }).sort({ renewalDate: 1 });

        res.status(200).json({
            success: true,
            data: subscriptions,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * DELETE SUBSCRIPTION
 * Only owner can delete
 */
exports.deleteSubscription = async (req, res, next) => {
    try {
        const subId = req.params.id;
        const userId = req.user._id;

        const subscription = await Subscription.findById(subId);
        if (!subscription) {
            const error = new Error("Subscription does not exist");
            error.statusCode = 404;
            throw error;
        }

        // 🔒 Ownership check
        if (subscription.user.toString() !== userId.toString()) {
            const error = new Error("Unauthorized");
            error.statusCode = 403;
            throw error;
        }

        await subscription.deleteOne();

        res.status(200).json({
            success: true,
            message: "Subscription deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
