const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

app.use(express.json());


// mongodb+srv://aakash060325:aakash060325@cluster0.wehkzv4.mongodb.net--------atlas

mongoose.connect("mongodb://localhost:27017/Foodapp")
.then(()=>{
  console.log("Connected to database")
});
app.use("/products",productRoutes);
app.use("/user",userRoutes);
app.use("/cart",cartRoutes);
app.use("/order",orderRoutes);



app.listen(3000,()=> {
  console.log("server is running on port 3000");
})

