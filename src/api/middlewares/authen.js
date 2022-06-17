const httpStatus = require('http-status');
const passport = require('passport');
const APIError = require('../utils/APIError');
const scope = require('../models/scope');
const _ = require('lodash');
const { RESULT } = require('../utils/Result');
const blackList = require('../models/blacklist_token');
const authservice = require('../services/oauth/authservice');
const handleJWT = (req, res, next, scopeName) => async (err, user, info) => {
  const error = err || info;
  // let apiError = new APIError({
  //   message: error ? error.message : 'Unauthorized',
  //   status: httpStatus.UNAUTHORIZED,
  //   errors: error.name
  // });

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
    let isLogout = await authservice.checkBlacklist(req.headers['authorization'].split(" ")[1]);
    if (isLogout) {
      let apiError = new APIError({
        message: 'Token is logout.',
        status: httpStatus.UNAUTHORIZED
      });
      throw apiError;
    }
    req.token_payload = user.payload
    let data = await scope.findOne({ scopeName: scopeName }).populate('roleList');
    if (data === null || data.roleList.length === 0) {
      return next();
    }
    else if (data.roleList && data.roleList.length > 0) {
      let roleName = data.roleList.map((r) => { return r.roleName; });
      let listRole = _.intersectionWith(user.roles, roleName, _.isEqual);
      if (listRole.length > 0) {
        return next();
      } else {
        let apiError = new APIError({
          message: 'Forbidden',
          status: httpStatus.FORBIDDEN
        });
        throw apiError;
      }
    }
  } catch (e) {
    return next(e);
  }
  return next();
};


exports.authorize = (scopeName = '') => (req, res, next) => {
  passport.authenticate(
    'jwt', { session: false },
    handleJWT(req, res, next, scopeName)
  )(req, res, next);
};


