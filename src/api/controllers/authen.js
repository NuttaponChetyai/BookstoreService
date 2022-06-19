const authenService = require('../services/authentication/authen.service');
const { handleResponse } = require('../utils/Response');

exports.login = async (req, res) => {
	const response = await authenService.login(req, res);
	handleResponse(res, response);
};