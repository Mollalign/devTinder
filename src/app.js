require('dotenv').config();
const express = require('express');
const connectDB = require("./config/db");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Creating new instance of the user model
  const user = new User(req.body);
  
  try {
   await user.save();
   res.send("User Added Successfully!!");
  } catch (err) {
   res.status(400).send("Error saving the user: " + err.message);
  }
});

// get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
   const users = await User.find({emailId: userEmail});
   if (users.length  === 0) {
    res.status(400).send("user not found")
   } else {
    res.send(users);
   }
  } catch (error) {
    res.status(400).send("Something went wrong")
  }

});

// Get user by id 
app.get("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
   const users = await User.findById({_id: userId});
   if (users.length  === 0) {
    res.status(400).send("user not found")
   } else {
    res.send(users);
   }
  } catch (error) {
    res.status(400).send("Something went wrong")
  }
});

// find Api - GET /feed - get all the users from the database 
app.get("/feed", async (req, res) => { 
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong")
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);

    res.send("User Deleted Successfully!!")
  } catch (err) {
    res.status(400).send("Something went wrong")
  }
});
 

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate(userId, data);
    res.send("User Updated Successfully!!");
  } catch (err) {
    res.status(400).send("Something went wrong")
  }
});


connectDB().then(() => {
  console.log("Database connection established...");
  app.listen(3000, () => {
  console.log('Server is listening on Port http://localhost:3000/');
}); 
}).catch(err => {
  console.log("Database cannot be connected!!");
  console.log(err);
}); 



