const Order = require("./../models/orderModel");
const User = require("./../models/userModel");
const errorHandler = require("./../utils/errorHandler");
const jwt = require("jsonwebtoken");
const Stripe = require("stripe");
require("dotenv").config({ path: "./config.env" });

//configure stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// console.log(stripe);

// placing order
exports.placeOrder = async (req, res, next) => {
  const { _id } = req.user;
  const frontend_url = process.env.FRONTEND_URL;

  const { items, amount, address } = req.body;
  try {
    const order = await Order.create({
      userId: _id,
      items,
      amount,
      address,
    });

    await User.findByIdAndUpdate(_id, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.new_price * 100,
      },
      quantity: item.quantity,
    }));
    // add shipping fee
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Shipping Fee",
        },
        unit_amount: 1 * 100,
      },
      quantity: 1,
    });
    // console.log(line_items);
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${order._id}`,
    });
    res.status(200).json({ success: true, session_url: session.url });
  } catch (err) {
    next(err);
  }
};

exports.verifyOrder = async (req, res, next) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { payment: true },
        { new: true }
      );
      res.status(200).json(order);
    } else {
      const order = await Order.findByIdAndDelete(orderId);
      res.status(200).json(order);
    }
  } catch (err) {
    next(err);
  }
};

// use orders for frontend
exports.userOrders = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const orders = await Order.find({ userId: _id });
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

//listing orders for admin panel
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

// api for updating the status
exports.updateStatus = async (req, res, next) => {
  const { orderId, status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};
