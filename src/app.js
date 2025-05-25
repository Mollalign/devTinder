require('dotenv').config();
const express = require('express');
const connectDB = require("./config/db");
const app = express();

const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use(express.json());
app.use(cookieParser());


app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);



// // get user by email
// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;

//   try {
//    const users = await User.find({emailId: userEmail});
//    if (users.length  === 0) {
//     res.status(400).send("user not found")
//    } else {
//     res.send(users);
//    }
//   } catch (error) {
//     res.status(400).send("Something went wrong")
//   }

// });

// // Get user by id 
// app.get("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//    const users = await User.findById({_id: userId});
//    if (users.length  === 0) {
//     res.status(400).send("user not found")
//    } else {
//     res.send(users);
//    }
//   } catch (error) {
//     res.status(400).send("Something went wrong")
//   }
// });

// // find Api - GET /feed - get all the users from the database 
// app.get("/feed", async (req, res) => { 
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (error) {
//     res.status(400).send("Something went wrong")
//   }
// });

// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     const user = await User.findByIdAndDelete(userId);

//     res.send("User Deleted Successfully!!")
//   } catch (err) {
//     res.status(400).send("Something went wrong")
//   }
// });
 

// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;

//   try {
//     const ALLOWED_UPDATES = [
//       "photoUrl", 
//       "about", 
//       "gender", 
//       "age",
//       "skills"
//     ];

//     const isUpdateAllowed = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k));

//     if (!isUpdateAllowed) {
//       res.status(400).send("Updated not allowed")
//     }

//     if(data?.skills.length > 10) {
//       throw new Error("Skills cannot be more than 10");
//     }

//     const user = await User.findByIdAndUpdate(userId, data, {
//       returnDocument: "after",
//       runValidators: true
//     });
//     console.log(user)
//     res.send("User Updated Successfully!!");
//   } catch (err) {
//     res.status(400).send("UPDATE FAILED: " + err.message)
//   }
// });


connectDB().then(() => {
  console.log("Database connection established...");
  app.listen(3000, () => {
  console.log('Server is listening on Port http://localhost:3000/');
}); 
}).catch(err => {
  console.log("Database cannot be connected!!");
  console.log(err);
}); 