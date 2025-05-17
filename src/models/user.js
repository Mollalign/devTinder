const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
  }, 
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 15,
  },
  gender: {
    type: String,
    validate(value) {
      if(!["male", "female"].includes(value)) {
        throw new Error("Gender data is not valid");
      }
    } 
  },
  photoUrl: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
  }, 
  about: {
    type: String,
    default: "This is a default about of the user!"
  },
  skills: {
    type: [String],
  }
}, {
  timestamps: true,
});


module.exports = mongoose.model("User", userSchema);