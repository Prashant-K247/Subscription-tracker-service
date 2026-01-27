const ajBot = require('../config/arcjet.bot.js');
const arcjetBotMiddleware = async (req, res, next) => {
    try {
        if (process.env.NODE_ENV !== 'production') {
            return next();
        }
        const decision = await ajBot.protect(req);
        if (decision.isDenied() && decision.reason.isBot()) {
            return res.status(403).json({
                error: 'Bot access denied',
            });
        }
        next();
    }
    catch (error) {
        next(error);
    }
}
module.exports = arcjetBotMiddleware;
