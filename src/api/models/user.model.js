const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* User
*/

const userSchema = new mongoose.Schema({
    _id: { type: Schema.Types.ObjectId },
    username: { type: String, required: true },
    password: { type: String, required: true },
    date_of_birth: { type: Date },
    createdBy: { type: String },
    createdDate: { type: Date },
    updatedBy: { type: String },
    updatedDate: { type: Date }
}, { versionKey: false }
);

userSchema.index({ username: 1, password: 1 });

/**
 * @typedef User
 */
module.exports = mongoose.model('users', userSchema, 'users');
