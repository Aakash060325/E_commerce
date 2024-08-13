const cartController = require('../controllers/cartController')
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.js');

router.get("/",auth,cartController.getCartItems);
router.post("/",auth,cartController.createCart);
router.delete("/:id",auth,cartController.deleteCartProduct);

module.exports = router;