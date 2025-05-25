const express = require("express");
const {profile} = require('../controllers/profileController');
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");


profileRouter.get("/profile", userAuth, profile);

module.exports = profileRouter;