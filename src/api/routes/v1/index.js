const express = require('express');
const router = express.Router();
/**
 * route prefix  v1/xxx
 */

 router.get('/status', (req, res) => res.send('OK'));
 
 module.exports = router ;