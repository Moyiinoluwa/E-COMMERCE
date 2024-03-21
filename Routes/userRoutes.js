const express = require('express')
const router = express.Router()
const Controller = require('../Controller/userController')



//create user
router.post('/create', Controller.createUser)

//user login
router.post('/login', Controller.userLogin)

//get all users
router.get('/get', Controller.getUsers)

//get a user
router.get('/get/:id', Controller.getUser)

//verify otp
router.post('/verify-otp', Controller.verifyOtp)

//update user
router.put('/update/:id', Controller.updateUser)

//delete user
router.delete('/delete/:id',Controller.deleteUser)

//resend otp
router.post('/resend-otp', Controller.resendUserOtp)

//reset password link
router.post('/reset-password-link', Controller.resetUserPasswordLink)

//reset password
router.post('/rest-password', Controller.resetPassword)

//change password
router.patch('/change-password', Controller.changePassword)

module.exports = router;