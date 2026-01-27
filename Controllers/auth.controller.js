const mongoose = require('mongoose');
const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_EXPIRES_IN, JWT_SECRET } = require('../config/env.js');

// signup logic
exports.signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            const error = new Error('User already exist');
            error.statusCode = 401;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create(
            {
                name,
                email,
                password: hashedPassword
            }
        );

        const token = await jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(201).json(
            {
                success: true,
                message: 'user created successfully',
                data: {
                    token,
                    user: newUser
                }
            }
        )




    } catch (error) {
        next(error);
    }


}

exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('User do not exist sign-up first');
            error.statusCode = 404;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            const error = new Error('Invalid Password');
            error.statusCode = 404;
            throw error;
        }
        const token = await jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(201).json(
            {
                success: true,
                message: 'Logged in successfully',
                data: { token, user }
            }
        )



    } catch (error) {
        next(error);
    }
}

// backend just respond Frontend is responsible for signout
exports.signout = async (req, res, next) => {
    try {
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }

}