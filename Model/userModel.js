const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'Username is taken'],
        required: true
    },

    email: {
        type: String,
        unique: [ true, 'Email has been registered'],
        required: true
    },

    password: {
        type: String,
        required: true
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isloggedIn: {
        type: Boolean,
        default: false
    },

    isloggedOut: {
        type: Boolean,
        default: false
    },

    isResetPasswordLinkSent: {
        type: Boolean,
        default: false
    },

    resetLink: {
        type: String,
        default: ' '
    },

    resetLinkExpirationTime: {
        type: Date
    }
}, {
    timestamps: true
});



module.exports = mongoose.model('User', userSchema)