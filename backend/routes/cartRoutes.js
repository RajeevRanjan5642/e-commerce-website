const express = require("express");
const authMiddleware = require('./../middleware/authMiddleware')
const cartController = require('./../controllers/cartController');

const router = express.Router();

router.post("/addToCart", authMiddleware, cartController.addToCart);
router.post("/removefromcart",authMiddleware,cartController.removeFromCart);
router.post("/getcart",authMiddleware,cartController.getCart);

module.exports = router;