const userModel = require('../Models/User');

const createuser = async (email, password, name) => {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }
    const user = await userModel.create({ email, password, name });
    return user;
};


// Export as an object
module.exports = { createuser };
