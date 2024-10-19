const Subscriber = require("../models/SubscriberModel");
const errorHandler = require("../utils/errorHandler");

exports.subscribe = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(errorHandler(400, "Email is required"));
  }
  if (!validator.isEmail(email)) {
    return next(400, errorHandler("Email is not valid!"));
  }
  try {
    const subscriber = Subscriber.create({ email });
    res.status(200).json(subscriber);
  } catch (err) {
    next(err);
  }
};
