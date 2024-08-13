const Product = require("../models/productModel");
const { v4: uuidv4 } = require('uuid');

exports.getProducts = async(req,res)=>{
  
  try{
    const products = await Product.find()
    res.send(products);
  }
  catch(err){
    console.error(err);
  }
  
};

exports.createProduct = async (req,res)=>{
   const {name,description,price,category,image} = req.body;
   try{
   const product = new Product({
    id: uuidv4(),
    name:name,
    price:price,
    description:description,
    category:category,
    image:image
   })
   await product.save();
   res.status(200).json("Product created sucessfullly")
  }
  catch(err){
    console.error(err);
  }
}