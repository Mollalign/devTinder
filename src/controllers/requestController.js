const ConnectionRequest = require('../models/connectionRequest');
const User = require("../models/user")

const request = async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignore", "interested"];
    if(allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({message: "Invalid status type: " + status});
    }


    const toUser = await User.findById(toUserId);
    if(!toUser) {
      return res
        .status(400)
        .json({message: "User not found"});
    }

    // if there is an existing ConnectionRequest
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId}
      ]
    });

    if (existingConnectionRequest) {
      return res
        .status(400)
        .json({message: "connection request already exist!!"});
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    });

    const data = await connectionRequest.save();

    res.json({
      message: req.user.firstName + ' is ' + status + ' in ' + toUser.firstName,
      data,
    })

  } catch(err) {
    res.status(400).send("ERROR: " + err.message);
  }
}

const review = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;
    
    const allowedStatus = ["accepted", "rejected"];
    if(allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({message: "Invalid status type: " + status});
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });
 
    if(!connectionRequest) {
      return res
        .status(400)
        .json({message: "Connection request not found"});
    }

    connectionRequest.status = status;

    const data = await connectionRequest.save();

    res.json({message: "connection request " + status}, data);

  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
}

module.exports = {
  request,
  review
}