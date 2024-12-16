const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const errorHandler = require('./../utils/errorHandler');

const authMiddleware = async (req, res, next) => {
  const {authorization} = req.headers;
  console.log(req.headers);
  console.log(authorization);
  if (!authorization) {
    return next(errorHandler(401, "Authentication token is required."));
  }
  const token = authorization.split(" ")[1];
  try {
    const {id} = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findOne({_id:id}).select('_id');
    next();
  } catch (err) {
    return next(errorHandler(401, "Token expired."));
  }
};

module.exports =authMiddleware;