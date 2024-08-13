const Cart = require('../models/cartModel');
const Product = require("../models/productModel");

exports.createCart = async (req, res) => {
  const { user_id } = req.user;
  const { product_id, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user_id });
    if (!cart) {
      cart = new Cart({
        user_id,
        products: [{
          product_id,
          quantity,
        }]
      });
    } else {
      const productIndex = cart.products.findIndex(
        (prod) => prod.product_id === product_id
      );
      if (productIndex > -1) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.push({ product_id, quantity });
      }
    }

    await cart.save();
    return res.status(200).json({ message: "Product added/updated in cart", cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getCartItems = async (req, res) => {
  const { user_id } = req.user;
  let cart = await Cart.findOne({ user_id });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  try{
      let subTotal = 0;
      const cartItems = await Promise.all(cart.products.map(async (item) => {
          const product = await Product.findOne({id:item.product_id});
          subTotal += product.price * item.quantity;
          return {
            product_id:product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            quantity: item.quantity,
            image: product.image,
          };
        }));
        res.status(200).json({message:"Cart items fetched successfully",cartItems,subTotal });
  }catch(err){
         res.status(500).json({message : "cart not found",err});
  }
};

exports.deleteCartProduct = async (req,res) =>
{
  const {user_id} = req.user;
  const product_id = req.params.id;

  const cart = await Cart.findOne({ user_id });

  if(!cart){
    return res.status(404).json({ message: "Cart not Found"});
  }

  const isProductValid = cart.products.find(
    (product) => product.product_id === product_id
  );
  if(!isProductValid){
    return res.status(404).json({message: "Product not found in cart"});
  }
  if(cart.products.length <= 1){
    await Cart.deleteOne({ user_id });
    return res.status(200).json({message: "Cart deleted Sucessfully"});
  }else{
    cart.products = cart.products.filter((prod) => prod.product_id != product_id);
    await cart.save();
    res.status(200).json({message:"Product removed from cart successfully"});
  }
}