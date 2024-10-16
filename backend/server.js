const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
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

const upload = multer({ storage: storage });

//creating upload endpoint for images
app.use("/images", express.static("upload/images"));

app.post("/api/upload", upload.single("product"), (req, res) => {
  res.json({
    success: true,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});


//routes
app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)

connectDB();

app.listen(port, () => {
  console.log(`server is listening at port ${port}.`);
});


