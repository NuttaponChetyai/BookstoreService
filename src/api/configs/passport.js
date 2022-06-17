const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { jwtSecret } = require('../configs/var');

const jwtOptions = {
	secretOrKey: jwtSecret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const jwt = async (payload, done) => {
	try {
		const userInformation = payload.sub.informations
		if (userInformation) return done(null, userInformation);
		return done(null, false);
	} catch (error) {
		return done(error, false);
	}
};

exports.jwt = new JwtStrategy(jwtOptions, jwt);