const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again latter",
  };
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  if (err.code === 11000) {
    customError.msg = `Duplicate Value Error entered to ${Object.keys(
      err.keyValue
    )} field, please provide another value `;
    customError.statusCode = 400;
  }
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
