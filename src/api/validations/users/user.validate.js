const Joi = require('joi');

module.exports = {

  createuser: {
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
		date_of_birth: Joi.optional().allow()
		// date_of_birth:
    })
  }

};
