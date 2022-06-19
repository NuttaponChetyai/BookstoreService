const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpirationInterval } = require('../configs/var');
const _ = require('lodash');

exports.generateJWT = async (user) => {
	try {
		let newUserObject = _.omit(user, ['password', 'createdDate', 'createdBy', 'updatedDate', 'updatedBy', '_id' , 'date_of_birth']);
		let subObj = {
			informations: newUserObject,
		};

		const playload = {
			iat: dayjs().unix(),
			sub: subObj,
		};
		const accessToken = jwt.sign(playload, jwtSecret, {
			expiresIn: jwtExpirationInterval * 60
		});

		let objData = {
			username: user.username,
			access_token: accessToken
		};

		return objData;
	} catch (err) {
		throw err;
	}
};