require('dotenv').config();
const User = require('../models/user');
const Question = require('../models/question');
const jwt = require('jsonwebtoken');
const { Auth } = require("two-step-auth");  
const bcrypt = require('bcrypt');
const userOTPVerification = require('../models/userOTPVerification');


const registerUser = async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.mobile,
        role: req.body.role,
        address: {
            city: req.body.address.city,
            street: req.body.address.street,
            houseNumber: req.body.address.house_no,
            zip: req.body.address.zip,
            state: req.body.address.state
        },
        password: User.hashPassword(req.body.password),

    });
    User.find({ email: req.body.email }, (err, users) => {
        if (err) {
            console.log("err in finding email ");
            res.json({ msg: "some error!" });
        }
        if (users.length != 0) {
            console.log("already user with this email");
            res.json({ msg: "already user exist with this email!" });
        }
        else {
            user.save((error, registeredUser) => {
                if (error) {
                    console.log(error);
                    res.json({ msg: "some error!" });
                }
                else {
                    // let payload = { subject: registeredUser._id }
                    // let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
                    // res.status(200).json({ token: token })
                    res.status(201).json({ mgs: 'userCreated' });
                }
            })
        }
    })
}

const loginUser = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log(err)
            res.json({ msg: 'Something went worng' });
        } else {
            if (!user) {
                res.json({ msg: 'Invalid Email Please check again.' })
            } else {
                bcrypt.compare(req.body.password, user.password).then(match => {
                    if (match) {
                        console.log("login sucesssss");
                        let payload = { subject: user._id, email: user.email }
                        let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
                        res.status(200).json({ token: token })

                        // let new_otp = Math.floor(1000 + Math.random() * 9000)
                        login(user.email, user._id);
                    }
                    else {
                        console.log("incorrect password");
                        res.json({ msg: 'Incorrect password please try again.' })
                    }
                }).catch(err => {
                    console.log("something wrong");
                    res.json({ msg: 'Something went wrong' })
                })
            }
        }
    })
}

const otpVerification = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log(err)
            res.json({ msg: 'Something went worng' });
        } else{
            console.log(user)
            console.log(req.body.otp, user.otp)
                if (req.body.otp == user.otp) {
                    console.log("login sucesssss");
                    let payload = { subject: user._id, email: user.email }
                    let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
                    res.status(200).json({ token: token })
                }
                else {
                    console.log("Incorrect OTP");
                    res.json({ msg: 'Incorrect OTP please try again!' })
                }
        }
    })
}

const createQuestion = async (req, res) => {
    const question = new Question({
        question: req.body.question,
        answer: req.body.correct_option,
        option_a: req.body.option_a,
        option_b: req.body.option_b,
        option_c: req.body.option_c
    });

    await question.save((error, question) => {
        if (error) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            // let payload = { subject: registeredUser._id }
            // let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
            // res.status(200).json({ token: token })
            res.status(201).json({ question });
        }
    })
}

const getAllQuestion = async (req, res) => {
    const question = await Question.find({})
    res.status(200).json({ question });
}

const updateQuestion = async (req, res) => {
    console.log(req.body._id);
    const body = {
        question: req.body.question,
        answer: req.body.correct_option,
        option_a: req.body.option_a,
        option_b: req.body.option_b,
        option_c: req.body.option_c
    }
    await Question.findOneAndUpdate({ _id: req.body._id }, body).then(
        () => {
            res.status(201).json({
                message: 'question updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

const deleteQuestion = async (req, res) => {
    const _id = req.params._id
    console.log(_id);
    const question = await Question.findOneAndDelete({ _id: _id })
    // if (!question) {
    //     return (`No question with id : ${_id}`, 404);
    // }
    res.status(200).json({ question })
}

const getAllUser = async (req, res) => {
    const users = await User.find({});
    res.status(200).json({ users });
}

const getUserData = async (req, res) => {
    // console.log(req);
    const users = await User.findOne({ _id: req.userId });
    res.status(200).json({ users });
}

const updateUser = async (req, res) => {
    console.log(req.body._id);
    const body = {
        name: req.body.name,
        contact: req.body.mobile,
        email: req.body.email,
        role: req.body.role,
        address: {
            houseNumber: req.body.address.house_no,
            city: req.body.address.city,
            state: req.body.address.state,
            street: req.body.address.street,
            zip: req.body.address.zip,
        }
    }
    await User.findOneAndUpdate({ _id: req.params.id }, body).then(
        () => {
            res.status(201).json({
                message: 'question updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

async function updateOTP(user_id, latest_otp){
    console.log(user_id, latest_otp);
    const body = {
        otp: latest_otp
    }
    await User.findOneAndUpdate({ _id: user_id }, body).then(
        () => {
            res.status(201).json({
                message: 'OTP updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

async function login(emailId, userId) {
    const res = await Auth(emailId);
    console.log(res);
    console.log(res.mail);
    console.log(res.OTP);
    console.log(res.success);
    updateOTP(userId, res.OTP);
  }


module.exports = {
    registerUser,
    loginUser,
    getAllUser,
    createQuestion,
    getAllQuestion,
    updateQuestion,
    deleteQuestion,
    getUserData,
    updateUser, 
    otpVerification
}