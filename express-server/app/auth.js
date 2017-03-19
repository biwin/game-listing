var mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    email:  {type: String, index: {unique: true}},
    username: {type: String, index: {unique: true}},
    firstName: String,
    lastName: String,
    passwordHash: String,
    passwordSalt: String

});

const AuthUser = mongoose.model('AuthUser', UserSchema);
