require('dotenv').config();
module.exports = {
	env: process.env.NODE_ENV,
	port: process.env.PORT,
	jwtSecret: process.env.JWT_SECRET,
	jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
	mongoconnection: {
	  uri: process.env.MONGO_CONNECTION,
	},
	hash_key : process.env.HASH_KEY
 };
 
