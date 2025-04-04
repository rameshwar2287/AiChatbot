const jwt = require('jsonwebtoken');
const redisclient = require('../services/redis.services');

const authUser = async (req, res, next) => {
    try {
        // Retrieve token from cookie or Authorization header
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized user' });
        }
        const isBlacklisted=await redisclient.get(token);
        // Verify JWT Token
        if(isBlacklisted){
            res.cookies('token','');
            return res.status(401).json({ error: 'Unauthorized user' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "bantiahir");

        req.user = decoded;
        next(); // Proceed to next middleware
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};

module.exports = authUser;
