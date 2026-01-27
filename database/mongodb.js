const mongoose = require('mongoose');
const { DB_URI } = require('../config/env.js');

if (!DB_URI) {
    throw new Error('Data base is not connected .env problem')
}

const connectdb = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('connected to database');
    } catch (error) {
        console.error('error connecting to database: ', error)
        process.exit(1);
    }
}
module.exports = connectdb;
