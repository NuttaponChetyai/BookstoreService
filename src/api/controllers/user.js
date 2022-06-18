const userService = require('../services/user/user.service');
const { handleResponse } = require('../utils/Response');

exports.createUser = async (req, res) => {
	const response = await userService.createUser(req, res);
	handleResponse(res, response);
};
exports.getUser = async (req, res) => {
	const response = await userService.getUser(req, res);
	handleResponse(res, response);
};

exports.deleteUser = async (req, res) => {
	const response = await userService.deleteUser(req, res);
	handleResponse(res, response);
};

