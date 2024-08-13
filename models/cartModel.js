const mongoose = require("mongoose");

const cartScheme = new mongoose.Schema({
    user_id:String,
    products:[
        {
            product_id : String,
            quantity :Number
        }
    ]
})

const Cart = mongoose.model("cart",cartScheme);

module.exports = Cart;