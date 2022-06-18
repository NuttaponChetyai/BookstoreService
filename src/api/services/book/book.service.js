const { genarateResponseError, genarateResponse, handleResponse } = require('../../utils/Response');
const axios = require('axios').default;
const httpStatus = require('http-status');
const RESPONSE = require('../../store/response');
const _ = require('lodash');

exports.getBook = async (req, res) => {
	let response;
	try {
		const listBookResponse = [];
		const listRecommendBook = await axios.get('https://scb-test-book-publisher.herokuapp.com/books/recommendation');
		const listBook = await axios.get('https://scb-test-book-publisher.herokuapp.com/books');
		if (listRecommendBook.data.length === 0 && listBook.data.length === 0) {
			response = genarateResponse(httpStatus.NOT_FOUND, [], RESPONSE.RESPONSE_DESCRIPTION.DATANOTFOUND);
		} else {
			if (listRecommendBook.data.length > 0) {
				listRecommendBook.data.forEach(e => {
					listBookResponse.push({
						id: e.id,
						book_name: e.book_name,
						author_name: e.author_name,
						price: e.price,
						is_recommended: true
					});
				});
			}

			if (listBook.data.length > 0) {
				listBook.data.forEach(e => {
					listBookResponse.push({
						id: e.id,
						book_name: e.book_name,
						author_name: e.author_name,
						price: e.price,
						is_recommended: false
					});
				});
			}
			const result = _.uniqBy(listBookResponse, function (e) {
				return e.id;
			});
			response = genarateResponse(httpStatus.OK, result, RESPONSE.RESPONSE_DESCRIPTION.SUCCESS);
		}
	}
	catch (err) {
		response = genarateResponseError();
	} finally {
		return response;
	}
};
