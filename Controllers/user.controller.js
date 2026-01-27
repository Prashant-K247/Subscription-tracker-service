const User = require('../models/user.model.js');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).jsonp({
            success: true,
            data: users,
        })

    } catch (error) {
        next(error);
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).jsonp({ success: true, data: user });

    } catch (error) {
        next(error);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {

        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
}