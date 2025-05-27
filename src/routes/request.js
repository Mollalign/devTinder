const express = require("express");
const requestRouter = express.Router();
const {request} = require("../controllers/requestController");
const { userAuth } = require("../middlewares/auth");


requestRouter.post("/request/send/:status/:userId", userAuth, request);

module.exports = requestRouter;