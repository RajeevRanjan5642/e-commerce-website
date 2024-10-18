const User = require("./../models/userModel");

//add to cart
exports.addToCart = async (req, res, next) => {
  const { _id } = req.user;
  const { itemId } = req.body;
  try {
    const userData = await User.findById(_id);
    const cartData = await userData.cartData;
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }
    const user = await User.findByIdAndUpdate(_id, { cartData }, { new: true });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

//remove from cart
exports.removeFromCart = async (req, res, next) => {
  const { _id } = req.user;
  const { itemId } = req.body;
  try {
    const userData = await User.findById(_id);
    const cartData = await userData.cartData;
    if (cartData[itemId] > 0) cartData[itemId] -= 1;
    const user = await User.findByIdAndUpdate(_id, { cartData }, { new: true });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

//get cart
exports.getCart = async (req, res) => {
  const { _id } = req.user;
  try {
    const userData = await User.findById(_id);
    const cartData = await userData.cartData;
    res.status(200).json(cartData);
  } catch (err) {
    next(err);
  }
};
