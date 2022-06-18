const express = require('express');
const router = express.Router();
const authController = require('../../../controllers/authen');
/**
 * route prefix  v1/xxx
 */

router.post('/login', authController.login);

module.exports = router;