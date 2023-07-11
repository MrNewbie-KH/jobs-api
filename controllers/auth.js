const userModel = require("../models/User");
const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");
// const bcrypt = require("bcryptjs"); not used here
// const jwt = require("jsonwebtoken");

// ---------------------------------------------
// ---------------------------------------------

const login = async (req, res) => {
  // check for invalid user
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await userModel.findOne({ email });

  // look if available data not valid
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  // compare passwords
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthenticatedError("Invalid credintials - wrong password");
  }
  // if user entered or loggedin successfully then **create a token**.
  const token = user.createJWT();
  // send response with work
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};
const register = async (req, res) => {
  // create user
  const user = await userModel.create(req.body);
  // create token
  const token = user.createJWT();
  // send response with work
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};
module.exports = { login, register };
