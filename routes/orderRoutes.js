const orderController =  require('../controllers/orderController');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.js');

router.get("/",auth,orderController.getOrders);
router.post("/",auth,orderController.createOrder);

module.exports = router;