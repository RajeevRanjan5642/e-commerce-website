const express = require("express");
const userController = require("./../controllers/userController");
const fetchUser = require('./../middleware/authMiddleware')

const router = express.Router();

router.post("/signup", userController.signupUser);
router.post("/login", userController.loginUser);
router.post("/addToCart", fetchUser, userController.addToCart);
router.post("/removefromcart",fetchUser,userController.removeFromCart);
router.post("/getcart",fetchUser,userController.getCart);

module.exports = router;
