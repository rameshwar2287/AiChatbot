const { validationResult } = require('express-validator');
const {createuser} = require('../services/user.services');
const userModel=require('../Models/User')
const redisclient=require('../services/redis.services')
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const JWT_SECRET="bantiahir";
const createUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Call userService.createuser() correctly
        const salt =await bcrypt.genSalt(10);
        const secPass =await bcrypt.hash(req.body.password, salt);
        const user = await createuser(req.body.email, secPass, req.body.name);
        const jwtData=await jwt.sign(
            { email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.status(201).json({user,jwtData});
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
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({errr:"enter a valid email"});
        }
        console.log(user.password);
        const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
        return res.status(400).json({error :" please enter correct password"});
    }
        const jwtData=await jwt.sign(
            { email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.status(201).json({user,jwtData});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const logoutController=async(req,res)=>{
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        redisclient.set(token,'logout','EX',60*60*24);
        res.status(200).json({message:"logout Sucessfully"});

    } catch (error) {
        return res.status(400).json({error:"user not logout"});
    }
}

const profileController = async (req, res) => {
    console.log(req.user);
    res.status(200).json({user:req.user});
};
// Export as an object
module.exports = { createUserController,loginController,profileController,logoutController};
