const profile = async (req, res) => {
 try {
    const user = req.user;
    res.send(user);
 } catch(err) {
   res.status(400).send("ERROR: " + err.message)
 }
}

module.exports = {
  profile
}