const express = require('express');
const router = express.Router();
const authRoute = require('./authentication/authen');
const userRoute = require('./user/user');
const bookRoute = require('./book/book');
/**
 * route prefix  v1/xxx
 */

 router.use('/authen', authRoute);
 router.use('/users', userRoute);
 router.use('/books', bookRoute);
 module.exports = router ;