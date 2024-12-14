const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/errorHandler");

exports.signupUser = async (req, res,next) => {
  const { name, email, password, cartData } = req.body;

  // validation
  try {
    if (!name || !email || !password) {
      return next(
        errorHandler(400, "Name, email and password are required !!")
      );
    }
    if (!validator.isEmail(email)) {
      return next(errorHandler(400, "Email is not valid!"));
    }
    if (!validator.isStrongPassword(password)) {
      return next(errorHandler(400, "Please use a strong password!"));
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "Email already in use."));
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    //generate salt
    const salt = await bcrypt.genSalt(10);
    //hashing
    const hashedPassword = await bcrypt.hash(password, salt);

    //create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      cartData: cart,
    });

    //jwt authentication
    //create token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

//loginUser
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(errorHandler(400, "Email and password required !!"));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(400, "Invalid login credentials"));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
      res.status(200).json({ token,isAdmin:user.isAdmin });
    }
    else return next(errorHandler(400, "Invalid login credentials"));
  } catch (err) {
    next(err);
  }
};
