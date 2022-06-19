const { genarateResponseError, genarateResponse, handleResponse } = require('../../utils/Response');
const bookService = require('../book/book.service');
const httpStatus = require('http-status');
const RESPONSE = require('../../store/response');
const orderModel = require('../../models/order.model');
const mongoose = require('mongoose');

exports.createOrder = async (req, res) => {
	let response;
	try {
		const listBook = await bookService.getBook(req, res);
		const { orders } = req.body;
		if (listBook.response.resultData.length > 0) {
			const searchBook = listBook.response.resultData.filter(x => orders.includes(x.id));
			const totalPrice = searchBook.reduce((accumulator, current) => accumulator + current.price, 0);
			let objOrder = {
				_id : new mongoose.Types.ObjectId(),
				books: orders,
				user: req.user._id,
				price: totalPrice
			};
			
			let model = new orderModel(objOrder);
			await model.save();
			response = genarateResponse(httpStatus.OK, { price: totalPrice }, RESPONSE.RESPONSE_DESCRIPTION.SUCCESS);
		} else {
			response = genarateResponse(httpStatus.NOT_FOUND, [], RESPONSE.RESPONSE_DESCRIPTION.DATANOTFOUND);
		}
	}
	catch (err) {
		response = genarateResponseError();
	} finally {
		return response;
	}
};
