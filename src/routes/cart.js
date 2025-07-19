const express = require("express");
const { getUserCart, addToCart,removefromCart } = require("../controllers/CartControllers");
const router = express.Router();


router.get("/Get-user-cart", getUserCart);
router.post("/Add-to-cart",addToCart);
router.delete('/Remove-from-cart', removefromCart);

module.exports = router;
