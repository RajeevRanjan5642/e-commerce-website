const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config({ path: "./config.env" });

//app instance
const app = express();

//middleware to parse incoming json requests
app.use(express.json());
app.use(cors());

//api
app.get("/", (req, res) => {
  res.send("Hello Shoppers");
});

// image storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const port = process.env.PORT || 4000;
//connect to database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`server is listening at port ${port}.`);
    });
  })
  .catch((err) => console.log(err));
