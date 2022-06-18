const userModel = require('../../models/user.model');
const orderModel = require('../../models/order.model');
const { genarateResponseError, genarateResponse, handleResponse } = require('../../utils/Response');
const httpStatus = require('http-status');
const RESPONSE = require('../../store/response');
const { hash_key } = require('../../configs/var');
const CryptoJS = require('crypto-js');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
const mongoose = require('mongoose');

exports.createUser = async (req, res) => {
	let response;
	try {
		const { username, password, date_of_birth } = req.body;
		let pass = CryptoJS.HmacSHA256(password, hash_key).toString();
		const birthdate = dayjs(date_of_birth, "DD/MM/YYYY");
		const user = await userModel.findOne({ username: username });
		if (user) {
			response = genarateResponse(httpStatus.CONFLICT, undefined, RESPONSE.RESPONSE_DESCRIPTION.ALREADYEXITS);
		} else {
			let objUser = {
				_id: new mongoose.Types.ObjectId(),
				username: username,
				password: pass,
				date_of_birth: birthdate
			};

			let model = new userModel(objUser);
			await model.save();
			response = genarateResponse(httpStatus.OK, undefined, RESPONSE.RESPONSE_DESCRIPTION.SUCCESS);
		}
	}
	catch (err) {
		response = genarateResponseError();
	} finally {
		return response;
	}
};

exports.getUser = async (req, res) => {
	let response;
	try {
		const { _id } = req.user;
		const resultQuery = await orderModel.findOne({ user: _id }).populate('user');
		if (resultQuery) {
			let objResponse = {
				username: resultQuery.user.username,
				date_of_birth: dayjs(resultQuery.user.date_of_birth).format("DD/MM/YYYY"),
				books: resultQuery.books
			};
			response = genarateResponse(httpStatus.OK, objResponse, RESPONSE.RESPONSE_DESCRIPTION.SUCCESS);
		}
		else {
			response = genarateResponse(httpStatus.NOT_FOUND, undefined, RESPONSE.RESPONSE_DESCRIPTION.DATANOTFOUND);
		}

	}

	catch (err) {
		console.log(err)
		response = genarateResponseError();
	} finally {
		return response;
	}
};

exports.deleteUser = async (req, res) => {
	let response;
	try {
		const { _id } = req.user;
		const resultQuery = await userModel.findOne({ _id: _id });
		if (resultQuery) {
			await userModel.deleteOne({ _id: _id });
			await orderModel.deleteMany({ username: _id });
			response = genarateResponse(httpStatus.OK, undefined, RESPONSE.RESPONSE_DESCRIPTION.SUCCESS);
		}
		else {
			response = genarateResponse(httpStatus.NOT_FOUND, undefined, RESPONSE.RESPONSE_DESCRIPTION.DATANOTFOUND);
		}
	}

	catch (err) {
		response = genarateResponseError();
	} finally {
		return response;
	}
};
