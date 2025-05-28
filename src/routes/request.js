const express = require("express");
const requestRouter = express.Router();
const {request, review} = require("../controllers/requestController");
const { userAuth } = require("../middlewares/auth");


requestRouter.post("/request/send/:status/:userId", userAuth, request);

requestRouter.post('/request/review/:status/:requestId', userAuth, review);

module.exports = requestRouter;