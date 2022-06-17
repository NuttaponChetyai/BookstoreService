const express = require('express');
const router = express.Router();
/**
 * index route for control api version
 */

 router.use('/v1', require('../routes/v1'));
 module.exports = router;