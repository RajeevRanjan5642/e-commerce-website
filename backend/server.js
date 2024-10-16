const express = require("express");
const path = require("path");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./db");

require("dotenv").config({ path: "./config.env" });

// app config
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors());

//api endpoints
app.use("/images", express.static("upload/images"));
app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)

connectDB();

app.listen(port, () => {
  console.log(`server is listening at port ${port}.`);
});


