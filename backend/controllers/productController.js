const Product = require("./../models/productModel");
const errorHandler = require("./../utils/errorHandler");
const fs = require("fs");
require("dotenv").config({ path: "./config.env" });

const backend_url = process.env.BACKEND_URL;

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  const image_filename = `${backend_url}/images/${req.file.filename}`;
  const products = await Product.find({});
  const length = products.length;
  let id = 1;
  if (length > 0) id = products[length - 1].id + 1;
  const { name, category, new_price, old_price } = req.body;
  const { _id } = req.user;
  try {
    if (user && user.rol === "admin") {
      const product = await Product.create({
        id,
        name,
        image: image_filename,
        category,
        new_price,
        old_price,
      });
      res.status(200).json(product);
    } else {
      return next(errorHandler(400, "You are not an admin."));
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  try {
    if (user && user.rol === "admin") {
      const product = await Product.findOne({ id });
      //delete the image from folder
      fs.unlink(`upload/images/${product.image}`, () => {});
      await Product.findOneAndDelete({ id });
      res.status(200).json(product);
    } else {
      return next(errorHandler(400, "You are not an admin."));
    }
  } catch (err) {
    next(err);
  }
};

exports.getNewCollections = async (req, res, next) => {
  try {
    const products = await Product.find({});
    const newCollection = products.slice(-8);
    res.status(200).json(newCollection);
  } catch (err) {
    next(err);
  }
};

exports.getPopularInWomen = async (req, res, next) => {
  try {
    const products = await Product.find({ category: "women" });
    const popularInWomen = products.slice(0, 4);
    res.status(200).json(popularInWomen);
  } catch (err) {
    next(err);
  }
};
