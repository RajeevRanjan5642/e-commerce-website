const express = require("express");
const subscriberController = require("./../controllers/subscriberController");
const validator = require("validator");

const router = express.Router();

router.post("/", subscriberController.subscribe);

module.exports = router;
