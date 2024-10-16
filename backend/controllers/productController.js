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
  const image_filename = `${req.file.filename}`;
  const products = await Product.find({});
  const length = products.length;
  let id=1;
  if(length>0) id = products[length-1].id+1;
  const { name, image, category, new_price, old_price } = req.body;
  try {
    const product = await Product.create({
      id,
      name,
      image:image_filename,
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
    const {id} = req.params;
    try{
        const product = await Product.findOneAndDelete({id});
        res.status(200).json(product);
    }catch(err){
        console.log(err);
    }
}

exports.getNewCollections = async(req,res)=>{
    try{
      const products = await Product.find({});
      const newCollection = products.slice(-8);
      res.status(200).json(newCollection);
    }catch(err){
      console.log(err);
    }
}

exports.getPopularInWomen = async(req,res)=>{
  try{
    const products = await Product.find({category:'women'});
    const popularInWomen = products.slice(0,4);
    res.status(200).json(popularInWomen);
  }catch(err){
    console.log(err);
  }
}
