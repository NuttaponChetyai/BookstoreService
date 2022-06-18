const express = require('express');
const router = express.Router();
const bookController = require('../../../controllers/book');
/**
 * route prefix  v1/xxx
 */

router.get('/', bookController.getBook);

module.exports = router;