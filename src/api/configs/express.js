const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const helmet = require('helmet');
const passport = require('passport');
const error = require('../middlewares/error'); 
const strategies = require('./passport');
const routes = require('../routes');
const bodyParser = require('body-parser');


/**
* Express instance
* @public
*/
const app = express();
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(methodOverride());
app.use(helmet());

//passport.js for authentication
app.use(passport.initialize());
passport.use('jwt', strategies.jwt);

// parse body params and attache them to req.body
app.use(bodyParser.json({limit: '50mb', extended: true}));


app.use('/api', routes);
// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);


module.exports = app;