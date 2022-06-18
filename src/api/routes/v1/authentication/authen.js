const express = require('express');
const router = express.Router();
const authController = require('../../../controllers/authen');
const { validate } = require('express-validation')
const validation = require('../../../validations/authentication/authentication.validate');
/**
 * route prefix  v1/xxx
 */

router.post('/login', validate(validation.login), authController.login);

module.exports = router;