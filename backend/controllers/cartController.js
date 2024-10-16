const User = require("./../models/userModel");

//add to cart
exports.addToCart = async(req,res)=>{
    const userData = await User.findOne({_id:req.user._id});
    userData.cartData[req.body.itemId]+=1;
    const user = await User.findOneAndUpdate({_id:req.user._id},{cartData:userData.cartData});
    res.status(200).json(user);
 };
 
 //remove from cart
 exports.removeFromCart = async(req,res)=>{
   const userData = await User.findOne({_id:req.user._id});
   if(userData.cartData[req.body.itemId]>0) userData.cartData[req.body.itemId]-=1;
   const user = await User.findOneAndUpdate({_id:req.user._id},{cartData:userData.cartData});
   res.status(200).json(user);
 }
 
 //get cart
 exports.getCart = async(req,res)=>{
   const userData = await User.findOne({_id:req.user._id});
   res.status(200).json(userData.cartData);
 }
 