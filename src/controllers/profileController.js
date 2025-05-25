const { validateProfileEditData } = require("../utils/validation");

const profile = async (req, res) => {
 try {
    const user = req.user;
    res.send(user);
 } catch(err) {
   res.status(400).send("ERROR: " + err.message)
 }
}

const profileEdit = async (req, res) => {
  try {
    if(!validateProfileEditData(req)) {
      throw new Error("Invalid Edit Request")
    }
    
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
   
    res.json({
      message : `${loggedInUser.firstName} your profile updated successfully`, 
      data: loggedInUser
    });
    
  } catch(err) {
    res.status(400).send("ERROR : " + err.message);
  }
}

const editPassword = async (req, res) => {
  try {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;

    // Compare old password with the stored hash
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update and save the new password
    user.password = hashedPassword;
    await user.save();

    // Respond to the client
    return res.status(200).json({ message: "Password updated successfully" });

  } catch (err) {
    return res.status(400).json({ message: "ERROR: " + err.message });
  }
};


module.exports = {
  profile,
  profileEdit,
  editPassword
}