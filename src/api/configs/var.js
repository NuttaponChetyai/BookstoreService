require('dotenv').config();
module.exports = {
	env: process.env.NODE_ENV,
	port: process.env.PORT,
	jwtSecret: process.env.JWT_SECRET,
	jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
	refresh_token_expire: process.env.REFRESH_TOKEN_EXPIRATION_MINUTES,
	mongoconnection: {
	  uri: process.env.MONGO_CONNECTION,
	},
	

 };
 
