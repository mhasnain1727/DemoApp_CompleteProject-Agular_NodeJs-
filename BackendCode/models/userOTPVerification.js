const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userOTPVerificationSchema = mongoose.Schema({
    userEmail: String,
    userId: String,
    otp: String,
    // createdAt: Date,
    // expiresAt: Date,
})

const userOTPVerification = mongoose.model('UserOTPVerification', userOTPVerificationSchema)

module.exports = userOTPVerification;