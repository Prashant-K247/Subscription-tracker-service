const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 51
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        }
    }, { timestamps: true }
)
const User = mongoose.model('User', userSchema);
module.exports = User;
