const arcjetModule = require('@arcjet/node');
const arcjet = arcjetModule.default || arcjetModule;
const { shield, tokenBucket } = arcjetModule;
const { ARCJET_KEY } = require('./env.js');

const aj = arcjet({
    key: ARCJET_KEY,
    rules: [
        // Protects against common attacks (SQLi, XSS, etc.)
        shield({ mode: 'LIVE' }),

        // Rate limiting only
        tokenBucket({
            mode: 'LIVE',
            refillRate: 5,   // 5 requests
            interval: 10,    // per 10 seconds
            capacity: 5,     // max burst of 5
        }),
    ],
});

module.exports = aj;
