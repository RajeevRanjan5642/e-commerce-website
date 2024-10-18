const orderController = require("./../controllers/orderController");
const express = require("express");
const fetchUser = require("./../middleware/authMiddleware");

const router = express.Router();

//endpoints
router.post("/place",fetchUser,orderController.placeOrder);

module.exports = router;