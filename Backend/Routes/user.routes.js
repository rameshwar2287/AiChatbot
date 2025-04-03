const express = require('express');
const router = express.Router();
const { createUserController, loginController } = require('../Controllers/user.controller');
const { body } = require('express-validator');

router.post('/reg', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], createUserController);

router.post('/login', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], loginController);

module.exports = router;
