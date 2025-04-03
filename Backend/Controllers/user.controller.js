const { validationResult } = require('express-validator');
const {createuser} = require('../services/user.services');
const userModel=require('../Models/User')
const createUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Call userService.createuser() correctly
        const user = await createuser(req.body.email, req.body.password, req.body.name);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const loginController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Call userService.createuser() correctly
        const {email,password}=req.body;
        const user = await userModel.findOne({email,password});
        if(!user){
            return res.status(400).json({errr:"enter a valid email"});
        }
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Export as an object
module.exports = { createUserController,loginController };
