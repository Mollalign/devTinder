const express = require("express");
const {profile, profileEdit, editPassword} = require('../controllers/profileController');
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");


profileRouter.get("/profile/view", userAuth, profile);
profileRouter.patch("/profile/edit", userAuth, profileEdit)
profileRouter.patch("/profile/password", userAuth, editPassword) 

module.exports = profileRouter;