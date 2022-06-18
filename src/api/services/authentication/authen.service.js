const userModel = require('../../models/user.model');
const { genarateResponseError, genarateResponse, handleResponse } = require('../../utils/Response');
const httpStatus = require('http-status');
const RESPONSE = require('../../store/response');
const utility = require('../../utils/utility');
const { hash_key } = require('../../configs/var');
const CryptoJS = require('crypto-js');

exports.login = async (req, res) => {
	let response;
	try {
		const { username, password } = req.body;
		let pass = CryptoJS.HmacSHA256(password, hash_key).toString();
		const user = await userModel.findOne({ username: username, password: pass }).lean();
		if (user) {
			let token = await utility.generateJWT(user, 'platform');
			response = genarateResponse(httpStatus.OK, token, RESPONSE.RESPONSE_DESCRIPTION.SUCCESS);
		} else {
			response = genarateResponse(httpStatus.UNAUTHORIZED, undefined, RESPONSE.RESPONSE_DESCRIPTION.UNAUTHORIZE);
		}
	}
	catch (err) {
		response = genarateResponseError();
	} finally {
		return response;
	}
};

