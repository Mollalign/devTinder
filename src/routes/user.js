const express = require('express')

const userRouter = express.Router();

const {getRequest, getConnection, feed} = require('../controllers/userController');
const { userAuth } = require('../middlewares/auth');
const authRouter = require('./auth');

// Get all the pending connection request for the logged user
userRouter.get("/user/requests/received", userAuth, getRequest);

userRouter.get("/user/connections", userAuth, getConnection);

userRouter.get("/user/feed", authRouter, feed);

module.exports = userRouter;