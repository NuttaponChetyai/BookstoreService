const Joi = require('joi');

module.exports = {

  createOrder: {
    body: Joi.object({
      orders: Joi.array().items(
			Joi.number()
		).required()
    })
  }

};
