const express = require('express');
const verifyToken = require('../middleware/token');
const router = express.Router();

const { registerUser, loginUser, getAllUser, createQuestion, getAllQuestion, updateQuestion, deleteQuestion
    , getUserData, updateUser, otpVerification } = require('../controller/user')

// createUser
router.post('/registerUser', registerUser);

// login user 
router.post('/login', loginUser);

// Get all created users
router.get('/getUser', getAllUser);

// Post question
router.post('/createQuestion', createQuestion);

// Get question
router.get('/getQuestion', getAllQuestion);

// Update question
router.put('/updateQuestion', updateQuestion)

// Delete question
router.delete('/deleteQuestion/:_id', deleteQuestion)

// get Single user data
router.get('/user', verifyToken, getUserData);

// update single user data
router.put('/user/:id', updateUser);

// OTP verfication
router.post('/login/otpVerification', otpVerification);

module.exports = router;