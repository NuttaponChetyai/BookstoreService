const httpStatus = require('http-status');
const passport = require('passport');
const APIError = require('../utils/APIError');
const userModel = require('../models/user.model');
const handleJWT = (req, res, next) => async (err, user, info) => {
  const error = err || info;
  if (error)
    error.message = (error.message === "No auth token") ? "Unauthorized" : error.message;
  try {
    if (error || !user) {
      let apiError = new APIError({
        message: error ? error.message : 'Unauthorized',
        status: httpStatus.UNAUTHORIZED,
        errors: error.name
      });
      if (apiError.errors === "TokenExpiredError") {
        apiError.errors = undefined;
        apiError.message = "Access token expired";
      }
      throw apiError;
    }
    const userData = await userModel.findOne({ username: user.username }).select({username : 1 , _id : 1}).lean();
    if(userData) {
      req.user = userData;
    }else{
      let apiError = new APIError({
        message: error ? error.message : 'Unauthorized',
        status: httpStatus.UNAUTHORIZED,
      });
      throw apiError;
    }

  } catch (e) {
    return next(e);
  }
  return next();
};


exports.authorize = () => (req, res, next) => {
  passport.authenticate(
    'jwt', { session: false },
    handleJWT(req, res, next)
  )(req, res, next);
};


