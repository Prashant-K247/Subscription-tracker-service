// Convert ESM imports/exports to CommonJS
const { Router } = require('express');
const { signin, signout, signup } = require('../Controllers/auth.controller.js');

const authRouter = Router();
// /api/v1/auth/
authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.post('/signout', signout);

module.exports = authRouter;
