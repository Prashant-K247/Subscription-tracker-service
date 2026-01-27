const { Router } = require('express');
const { deleteUser, getUser, getUsers } = require('../Controllers/user.controller.js');
const authorize = require('../middleware/auth.middleware.js');

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', authorize, getUser);
usersRouter.put('/:id', (req, res) => res.send({ title: "update user details" })); //future
usersRouter.delete('/:id', authorize, deleteUser); //done

module.exports = usersRouter;
