const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    address: {
        type:String,
        required:[true,"Address is required"]
    },
    phone_no:{
        type:Number,
        required:[true,"Phone number is required"]
    },
    products:[{
        product_id : String,
        quantity : Number
    }],
    order_date:{
        type:Date,
        default:Date.now()
    },
    estimatedDate:{
        type:Date,
        default: function() {
            return new Date(this.order_date.getTime() + 10*24*60*60*100)
        }
    },
    user_id:{
        type:String,
        required:[true,"User ID is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    }


})

const Order = new mongoose.model("Order",orderSchema)

module.exports = Order;