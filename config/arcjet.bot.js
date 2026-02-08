const arcjetModule = require('@arcjet/node');
const arcjet = arcjetModule.default || arcjetModule;
const { detectBot } = arcjetModule;
const { ARCJET_KEY } = require('./env.js');


const ajBot = arcjet({
    key: ARCJET_KEY,
    rules: [
        detectBot({
            mode: 'LIVE',
            allow: [
                'CATEGORY:SEARCH_ENGINE', 
            ],
        }),
    ],
});
module.exports = ajBot;
