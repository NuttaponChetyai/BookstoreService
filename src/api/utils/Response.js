
const httpStatus = require('http-status')

exports.genarateResponse = (httpStatus, resultData, resultDescription) => {
	return {
		httpStatus: httpStatus,
		response : {
			resultData: resultData,
			resultDescription : resultDescription
		}
	};
	
};

exports.handleResponse = (res,  responseData) => {
	res.status(responseData.httpStatus).send(responseData.response);
};

exports.genarateResponseError = () => {
	return {
		httpStatus: httpStatus.INTERNAL_SERVER_ERROR,
		response : {
			resultDescription: "INTERNAL_SERVER_ERROR"
		}
	
	};
}
