const httpStatus = require('http-status');
const expressValidation = require('express-validation');
const APIError = require('../utils/APIError');
const { env } = require('../configs/var')

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res, next) => {
  const response = {
    responseData: {
      resultDescription: err.message || httpStatus[err.status],
    },
    httpStatus: err.status
  };
  res.status(response.httpStatus).send(response.responseData);

};
exports.handler = handler;

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
exports.converter = (err, req, res, next) => {
  let convertedError = err;
  if (err instanceof expressValidation.ValidationError) {
    convertedError = new APIError({
      message: 'Validation Error',
      errors: err.errors,
      status: err.status,
      stack: err.stack,
    });
  }
  else if (err instanceof SyntaxError) {
    convertedError = new APIError({
      message: 'System error',
      status: 500,
    });
  }
  else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }
  for (let i in convertedError.errors) {
    if (convertedError.errors[i].field) {
      convertedError.errors[i].field.splice(0, 1);
    }
  }
  return handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res, next) => {
  const err = new APIError({
    message: 'Url not found',
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};
