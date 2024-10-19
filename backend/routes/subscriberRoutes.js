const express = require("express");
const subscriberController = require("./../controllers/subscriberController");

const router = express.Router();

router.post("/", subscriberController.subscribe);

module.exports = router;
