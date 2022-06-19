const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user.model');
/**
* User
*/

const orderSchema = new mongoose.Schema({
    _id: { type: Schema.Types.ObjectId },
    books: { type: Array, required: true },
    user: { type: Schema.Types.ObjectId, ref: user },
    price: { type: Number }
}, { versionKey: false }
);

orderSchema.index({ books: 1 });
orderSchema.index({ user: 1 });
/**
 * @typedef User
 */
module.exports = mongoose.model('orders', orderSchema, 'orders');
