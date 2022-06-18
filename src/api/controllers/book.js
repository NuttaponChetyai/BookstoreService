const bookService = require('../services/book/book.service');
const { handleResponse } = require('../utils/Response');

exports.getBook = async (req, res) => {
	const response = await bookService.getBook(req, res);
	handleResponse(res, response);
};
