const Order = require("./../models/orderModel");
const User = require("./../models/userModel");
const Stripe = require("stripe");
require("dotenv").config({ path: "./config.env" });

//configure stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing order
exports.placeOrder = async (req, res) => {
  const { userId, items, amount, address } = req.body;
  try {
    const order = await Order.create({
      userId,
      items,
      amount,
      address,
    });

    await User.findByIdAndUpdate(userId,{cartData:{}});

  } catch (err) {}
};
