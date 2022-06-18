const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/user');
const orderController = require('../../../controllers/order');
const { authorize } = require('../../../middlewares/authen');
const { validate } = require('express-validation')
const orderValidation = require('../../../validations/orders/order.validate');
const userValidation = require('../../../validations/users/user.validate');
/**
 * route prefix  v1/xxx
 */

router.post('/',validate(userValidation.createuser), userController.createUser);
router.get('/', authorize(), userController.getUser);
router.delete('/', authorize(), userController.deleteUser);
router.post('/orders', authorize(), validate(orderValidation.createOrder), orderController.createOrder);
module.exports = router;