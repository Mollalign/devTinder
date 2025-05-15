require('dotenv').config();
const express = require('express');
const connectDB = require("./config/db");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  // Creating new instance of the user model
  const user = new User({
    firstName: "Mollalign",
    lastName: "Daniel",
    emailId: "molledan26@gmail.com",
    password: "astro620it"
  });
  
  try {
   await user.save();
   res.send("User Added Successfully!!");
  } catch (err) {
   res.status(400).send("Error saving the user: " + err.message);
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



