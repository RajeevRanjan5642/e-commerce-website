const orderController = require("./../controllers/orderController");
const express = require("express");
const fetchUser = require("./../middleware/authMiddleware");

const router = express.Router();

//endpoints
router.post("/place",fetchUser,orderController.placeOrder);
router.post("/verify",orderController.verifyOrder);
router.post("/userorders",fetchUser,orderController.userOrders)

module.exports = router;