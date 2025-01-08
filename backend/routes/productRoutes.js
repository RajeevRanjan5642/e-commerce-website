const express = require("express");
const multer = require("multer");
const path = require("path");
const productController = require("./../controllers/productController");
const authMiddleware = require("./../middleware/authMiddleware");
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const cloudinary = require("./../utils/cloudinary")

const router = express.Router();

// image storage engine
const storage = new CloudinaryStorage({
  cloudinary:cloudinary,
  params:{
    folder:"images",
  }
});

const upload = multer({ storage: storage });

router.get("/", productController.getAllProducts);
router.post("/",authMiddleware, upload.single("product"),productController.createProduct);
router.delete("/:id", authMiddleware,productController.deleteProduct);
router.get("/newCollections", productController.getNewCollections);
router.get("/popularInWomen", productController.getPopularInWomen);

module.exports = router;
