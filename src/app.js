const express = require('express');

const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.get("/user", userAuth, (req, res) => {
  res.send("user data sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("get all Data");
});

app.listen(3000, () => {
  console.log('Server is listening on Port http://localhost:3000/');
}); 


