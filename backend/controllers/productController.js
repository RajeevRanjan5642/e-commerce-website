const Product = require("./../models/productModel");
const fs = require("fs");
require("dotenv").config({ path: "./config.env" });
const cloudinary = require('./../utils/cloudinary');

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
  const products = await Product.find({});
  const length = products.length;
  let id = 1;
  if (length > 0) id = products[length - 1].id + 1;
  const { name, category, new_price, old_price } = req.body;
  try {
    // upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    const product = await Product.create({
      id,
      name,
      image: result.secure_url,
      category,
      new_price,
      old_price,
    });
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ id });
    // Delete the image from Cloudinary 
    const imageId = product.image.split('/').pop().split('.')[0]; 
    await cloudinary.uploader.destroy(imageId);
    await Product.findOneAndDelete({ id });
    res.status(200).json(product);
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
