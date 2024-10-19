const Subscriber = require("../models/SubscriberModel");
const errorHandler = require("../utils/errorHandler");
const validator = require("validator");

exports.subscribe = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(errorHandler(400, "Email is required"));
  }
  if (!validator.isEmail(email)) {
    return next(errorHandler(400, "Email is not valid!"));
  }
  const exists = await Subscriber.findOne({ email });
    if (exists) {
      return next(errorHandler(400, "You have already subscribed !!"));
    }
  try {
    const subscriber = Subscriber.create({ email });
    res.status(200).json(subscriber);
  } catch (err) {
    next(err);
  }
};
