const express = require('express');

const app = express();

app.get("/user", (req,res) => {
  res.send({firstName: "Mollalign", lastName: "Daniel"});
});

app.post("/user", (req, res) => {
  res.send("Data is Saved successfully in The Database");
});

app.delete("/user", (req, res) => {
  res.send("Deleted!");
});


app.listen(3000, () => {
  console.log('Server is listening on Port http://localhost:3000/');
});


