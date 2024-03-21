const joi = require('joi')


const validator = (schema) => (payload) =>
schema.validate(payload, { abortEarly: false })

//create user
const registrationValidator = joi.object({
    email: joi.string().email().lowercase().required(),
    username: joi.string().lowercase().required(),
    password: joi.string().min(8).max(16).required()
});

//user login
const loginValidator = joi.object({
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(8).max(16).required()
})

//update user 
const updateUserValidator = joi.object({
    email: joi.string().email().lowercase(),
    username: joi.string()
})
//verify otp
const verifyOtpValidator = joi.object({
    email: joi.string().email().lowercase().required(),
    otp: joi.string().min(6).max(6).required()
})

//resend otp
const resendOtpValidator = joi.object({
    email: joi.string().email().lowercase().required()
})

//reset password link
const resetPasswordLinkValidator = joi.object({
    email: joi.string().email().lowercase().required()
})

//reset password
const resetPasswordValidator = joi.object({
    email: joi.string().email().lowercase().required(),
    resetLink: joi.string().required(),
    password: joi.string().min(8).max(16).required()
});

//change password
const changePasswordValidator = joi.object({
    oldPassword: joi.string().min(8).max(16).required(),
    newPassword: joi.string().min(8).max(16).required()
})


exports.registrationValidator = validator(registrationValidator)
exports.loginValidator = validator(loginValidator)
exports.verifyOtpValidator = validator(verifyOtpValidator)
exports.updateUserValidator = validator(updateUserValidator)
exports.resendOtpValidator = validator(resendOtpValidator)
exports.resetPasswordLinkValidator = validator(resetPasswordLinkValidator)
exports.resetPasswordValidator = validator(resetPasswordValidator)
exports.changePasswordValidator = validator(changePasswordValidator)