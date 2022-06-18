const app = require('./api/configs/express');
const mongoose = require('./api/configs/mongoose');

// open mongoose connection
mongoose.connect();
app.listen(process.env.PORT, () => console.log(`server started on port ${process.env.PORT} (${process.env.NODE_ENV})`));

/**
* Exports express
* @public
*/
module.exports = app;
