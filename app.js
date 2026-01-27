const express = require('express');
const { PORT } = require('./config/env.js');
const usersRouter = require('./routes/users.routes.js');
const authRouter = require('./routes/auth.routes.js');
const subscriptionRouter = require('./routes/subscription.routes.js');
const connectdb = require('./database/mongodb.js');
const errorMiddleware = require('./middleware/errorhandler.middleware.js');
const cookieParser = require('cookie-parser');
const arcjetMiddleware = require('./middleware/arcjet.middleware.js');
const arcjetBotMiddleware = require('./middleware/arcjetBot.middleware.js');
const workflowRouter = require('./routes/workflow.routes.js');

const app = express();

app.set('trust proxy', true);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(arcjetMiddleware);

app.use('/api/v1/users', arcjetBotMiddleware, usersRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscription', arcjetBotMiddleware, subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter)

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('welcome to Subscription Tracker');
});

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await connectdb();
});

module.exports = app;
