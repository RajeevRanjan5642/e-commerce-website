const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const errorHandler = require('./../utils/errorHandler');

const fetchUser = async (req, res, next) => {
  const {authorization} = req.headers;
  if (!authorization) {
    return next(errorHandler(401, "Session expired. Please logout and login again."));
  }

  const token = authorization.split(" ")[1];

  try {
    const {id} = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findOne({_id:id}).select('_id');
    next();
  } catch (err) {
    return next(errorHandler(401, "Session expired. Please logout and login again."));
  }
};

module.exports = fetchUser;