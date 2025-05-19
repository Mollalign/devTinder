const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
    validate(value) {
      if(validator.isEmail(value)) {
        throw new Error("Invalid email address: " + value)
      }
    }
  }, 
  password: {
    type: String,
    required: true,
    validate(value) {
      if(validator.isStrongPassword(value)) {
        throw new Error("Enter strong password: " + value);
      }
    }
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
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
    validate(value) {
      if(validator.isURL(value)) {
        throw new Error("Invalid Photo url: " + value)
      }
    } 
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

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({_id: user._id}, "DEV@Tinder$790", {
    expiresIn: "8d"
  });

  return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

  return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);