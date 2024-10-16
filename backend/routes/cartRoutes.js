const express = require("express");
const fetchUser = require('./../middleware/authMiddleware')
const cartController = require('./../controllers/cartController');

const router = express.Router();

router.post("/addToCart", fetchUser, cartController.addToCart);
router.post("/removefromcart",fetchUser,cartController.removeFromCart);
router.post("/getcart",fetchUser,cartController.getCart);

module.exports = router;