const orderService = require('../services/order/order.service');
const { handleResponse } = require('../utils/Response');

exports.createOrder = async (req, res) => {
	const response = await orderService.createOrder(req, res);
	handleResponse(res, response);
};
