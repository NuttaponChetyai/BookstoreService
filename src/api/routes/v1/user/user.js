const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/user');
const orderController = require('../../../controllers/order');
const { authorize } = require('../../../middlewares/authen');
/**
 * route prefix  v1/xxx
 */

router.post('/', userController.createUser);
router.get('/', authorize(), userController.getUser);
router.delete('/', authorize(), userController.deleteUser);
router.post('/orders', authorize(), orderController.createOrder);
module.exports = router;