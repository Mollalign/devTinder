const request = async (req, res) => {
  const user = req.user;

  res.send(user.firstName + "sent the connect request!")
}

module.exports = {
  request
}