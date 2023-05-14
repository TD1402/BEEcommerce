const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwtToken');

// create a user // register
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        //creat user
        const newUser = User.create(req.body);
        res.json(newUser);
    } else {
        //User already Exists
        throw new Error('User already eists');
    }
});

//login a user

const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    //check  if user exists or not
    const findUser = await User.findOne({ email: email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
        // res.json(findUser);
        res.json({
            _id: findUser?._id,
            fistname: findUser.fistname,
            lastname: findUser.lastname,
            email: findUser.email,
            mobile: findUser.mobile,
            token: generateToken(findUser?._id),
        });
    } else {
        throw new Error('Invalid Credentials');
    }
});

//update user

const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updateUser = await User.findByIdAndUpdate(
            id,
            {
                fistname: req?.body?.fistname,
                lastname: req?.body?.lastname,
                email: req?.body?.email,
                mobile: req?.body?.mobile,
            },
            {
                new: true,
            },
        );
        res.json(updateUser);
    } catch (error) {
        throw new Error(error);
    }
});

//get all user

const getallUser = asyncHandler(async (req, res) => {
    try {
        const getUser = await User.find();
        res.json(getUser);
    } catch (error) {
        throw new Error(error);
    }
});

//get a single user
const getaUser = asyncHandler(async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    try {
        const getaUser = await User.findById(id);
        res.json({
            getaUser,
        });
    } catch (error) {
        throw new Error(error);
    }
});

//delete a single user
const deleteaUser = asyncHandler(async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    try {
        const deleteaUser = await User.findByIdAndDelete(id);
        res.json({
            deleteaUser,
        });
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createUser,
    loginUserCtrl,
    getallUser,
    getaUser,
    deleteaUser,
    updateUser,
};
