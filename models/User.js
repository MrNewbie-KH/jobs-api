const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be Provided"],
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    required: [true, "Password must be Provided"],
    minlength: 8,
    // maxlength: 12,
  },
  email: {
    type: String,
    required: [true, "email must be Provided"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide a valid email",
    ],
    unique: true,
  },
});
// --------------------------------------------------------
// this is a hashing algorithm as a middleware
userModel.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// --------------------------------------------------------
// this is a function creation as getting token by jwt easily
userModel.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, userName: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};
// --------------------------------------------------------
// comparing function
userModel.methods.comparePassword = async function (providedPassword) {
  const isMatch = await bcrypt.compare(providedPassword, this.password);
  return isMatch;
};
// --------------------------------------------------------
module.exports = mongoose.model("User", userModel);
