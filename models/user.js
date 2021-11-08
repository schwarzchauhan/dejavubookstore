const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username not provided'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email not provided']
    },
    password: {
        type: String,
        required: [true, 'password not provided'],
        minLength: [8, 'password length must be at least 8 characters']
    },
    usertype: {
        type: String,
        default: 'normaluser'
    }
});

module.exports = mongoose.model('User', userSchema);