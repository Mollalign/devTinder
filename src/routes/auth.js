const express = require("express");
const { signup, signin, logout } = require("../controllers/authController")


const authRouter = express.Router();

authRouter.post("/signup", signup);

authRouter.post("/login", signin);
 
authRouter.post("/logout", logout);


module.exports = authRouter;