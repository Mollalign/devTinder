const ConnectionRequest = require('../models/connectionRequest');
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName photUrl age gender about skills"

const getRequest = async (req, res) => {
  try {
   const loggedInUser = req.user;

   const connectionRequest = await ConnectionRequest.find({
    toUSerId: loggedInUser.id,
    status: "interested"
   }).populate(
    "fromUserID", 
    USER_SAFE_DATA
   );

   
   res.json({
    message: "Data fetched successfully!",
    data: connectionRequest
   });

  } catch(err) {
    res.status(400).send("ERROR: " + err.message)
  }
}

const getConnection = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        {toUSerId: loggedInUser._id, status: "accepted"},
        {fromUserId: loggedInUser._id, status: "accepted"}
      ]
    }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequest.map((row) => {
      if(row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUSerId;
      }
      return row.fromUserId;
    });

    res.json({data})
  } catch(err) {
    res.status(400).send({message: err.message})
  }
}

const feed = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = ConnectionRequest.find({
      $or: [
        {fromUserId: loggedInUser._id},
        {toUSerId: loggedInUser._id}
      ]
    }).select("fromUserId toUserId");

    const hiddenUserFeed = new Set();

    connectionRequest.forEach(req => {
      hiddenUserFeed.add(req.fromUserId);
      hiddenUserFeed.add(req.toUserId);
    });

    const user = await User.find({
      $and: [{_id: {$nin: Array.from(hiddenUserFeed)}}, {_id: {$ne: loggedInUser._id}}]
    }).select(USER_SAFE_DATA);
    

    res.send(user);

  } catch(err) {
    res.status(400).json({message: err.message});
  }
}


module.exports = {
  getRequest,
  getConnection,
  feed
};