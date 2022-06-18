const mongoose = require('mongoose');
const { env, mongoconnection } = require('../configs/var');

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error 
mongoose.connection.on('error', (err) => {
	console.log(`MongoDB connection error: ${err}`);
	process.exit(-1);
});

// print mongoose logs in dev env
if (env !== 'production') {
	mongoose.set('debug', true);
}

/**
* Connect to mongo db
*
* @returns {object} Mongoose connection
* @public
*/

exports.connect = () => {
	mongoose.connect(mongoconnection.uri, {
		// useCreateIndex: true,
		keepAlive: 1,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		// useFindAndModify: false,
	});
	return mongoose.connection;
};
