const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  id:String,
  name: String,
  description: String,
  price: Number,
  catrgory: String,
  image: String,
})

const Product = new mongoose.model('Product',productSchema)

module.exports = Product;