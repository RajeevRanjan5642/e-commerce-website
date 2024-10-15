const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "Token not found" });
  }
  try {
    const {id} = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findOne({_id:id}).select('_id');
    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchUser;