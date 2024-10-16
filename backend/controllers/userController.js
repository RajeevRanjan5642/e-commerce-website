const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signupUser = async (req, res) => {
  const { name, email, password, cartData } = req.body;

  let check = await User.findOne({ email });
  if (check) {
    return res.status(400).json({
      success: false,
      error: "Email already exists",
    });
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
    expiresIn: "1h",
  });

  res.status(200).json({ success: true, token });
};

//loginUser
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    //compare password
    const isMatch = bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      res.status(200).json({ success: true, token });
    }
    else res.status(404).json({ success: false, error: "Invalid login credentials" });
  }
  else res.status(404).json({ success: false, error: "Invalid login credentials" });

};

