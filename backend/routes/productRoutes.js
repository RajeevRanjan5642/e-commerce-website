const express = require("express");
const multer = require("multer");
const path = require('path');
const productController = require("./../controllers/productController");
const authMiddleware = require("./../middleware/authMiddleware");

const router = express.Router();

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

router.get("/", productController.getAllProducts);
router.post("/",authMiddleware, upload.single("product"),productController.createProduct);
router.delete("/:id", authMiddleware,productController.deleteProduct);
router.get("/newCollections", productController.getNewCollections);
router.get("/popularInWomen", productController.getPopularInWomen);

module.exports = router;
