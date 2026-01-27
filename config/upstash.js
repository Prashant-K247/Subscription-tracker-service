const { Client: WorkflowClient } = require('@upstash/workflow');
const { QSTASH_URL, QSTASH_TOKEN } = require('./env.js');

exports.workflowClient = new WorkflowClient({
    token: QSTASH_TOKEN,
    baseUrl: QSTASH_URL
});
