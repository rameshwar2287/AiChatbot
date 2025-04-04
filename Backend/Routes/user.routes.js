const express = require('express');
const router = express.Router();
const { createUserController, loginController, profileController, logoutController } = require('../Controllers/user.controller');
const { body } = require('express-validator');
const authUser=require('../middleware/auth.middleware')

router.post('/reg', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], createUserController);

router.post('/login', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], loginController);
router.get('/profile',authUser,profileController);
router.get('/logout',authUser,logoutController);


module.exports = router;
