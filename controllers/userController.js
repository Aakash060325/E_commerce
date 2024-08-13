const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


exports.login = async (req,res)=>{
  const {email,password} = req.body;
  try{
    const user =await User.findOne({email});
    if(!user){
     return res.status(400).json({msg: "User not found"})
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
      return   res.status(400).json("msg: Invalid Password")
    }
    const token = jwt.sign({user_id: user._id},'secert_token',{expiresIn: "1h"})
    return res.status(200).json(token)
  }
  catch(err){
    console.error(err)
  }
}




exports.getUser = async(req,res)=>{
  
  try{
    const user = await User.find()
    res.send(user);
  }
  catch(err){
    console.error(err);
  }
  
};

exports.createUser = async (req,res)=>{
  const {name,email,password} = req.body;
  try{
  const user = new User({
   name,
   email,
   password
  })
  await user.save();
  res.status(200).json("Product created sucessfullly")
 }
 catch(err){
   console.error(err);
 }
}