const Product = require("./../models/productModel");

exports.getAllProducts = async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch(err){
        console.log(err);
    }
}

exports.createProduct = async (req, res) => {
  const products = await Product.find({});
  const id = products.length + 1;
  const { name, image, category, new_price, old_price } = req.body;
  try {
    const product = await Product.create({
      id,
      name,
      image,
      category,
      new_price,
      old_price,
    });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteProduct = async(req,res)=>{
    const id = req.params.id;
    try{
        const product = await Product.findOneAndDelete(id);
        res.status(200).json(product);
    }catch(err){
        console.log(err);
    }
}