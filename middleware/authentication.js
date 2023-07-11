const user = require("../models/User");
const jwt = require("jsonwebtoken");
const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors");

const auth = async function (req, res, next) {
  //checking the header
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("Auth not provided", 401);
  }
  // extract token
  const token = authHeader.split(" ")[1];
  try {
    // get the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId, userName: decoded.userName };
    next();
  } catch (error) {
    throw new CustomAPIError("NOT AUTHORIZED TO ACCESS route ", 401);
  }
};
module.exports = auth;
