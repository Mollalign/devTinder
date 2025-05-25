const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // Creating new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
  
    await user.save();
    res.send("User Added Successfully!!");
  } catch (err) {
   res.status(400).send("ERROR: " + err.message);
  }
}

const signin = async (req, res) => {
  try {
   const {emailId, password} = req.body;

   const user = await User.find({emailId: emailId});
   if (!user) {
    throw new Error("Invalid Credentials")
   }
   
   const isPasswordValid = await user.validatePassword(password);

   if (isPasswordValid) {
    const token = await user.getJWT();

    // Add the token to cookie and send the response back to the user
    res.cookie("token", token, {expires: new Date(Date.now() + 8 * 3600000)});
     
    res.send("Login Successful!");
   } else {
    throw new Error("Invalid Credentials");
   }
  } catch (err) {
   res.status(400).send("ERROR: " + err.message);
  }
}

const logout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  }).send();
}

module.exports = {
  signup,
  signin, 
  logout
}