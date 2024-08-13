const ProductController = require('../controllers/productController')
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');


router.get("/",ProductController.getProducts)
router.post("/",auth,ProductController.createProduct)



module.exports = router