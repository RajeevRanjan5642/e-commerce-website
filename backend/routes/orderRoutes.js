const orderController = require("./../controllers/orderController");
const express = require("express");
const authMiddleware = require("./../middleware/authMiddleware");

const router = express.Router();

//endpoints
router.post("/place", authMiddleware, orderController.placeOrder);
router.post("/verify", orderController.verifyOrder);
router.post("/userorders", authMiddleware, orderController.userOrders);
router.get("/", orderController.getAllOrders);
router.post("/status", authMiddleware,orderController.updateStatus);

module.exports = router;
