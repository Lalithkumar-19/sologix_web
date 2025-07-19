const express = require("express");
const { getUserCart, addToCart,removefromCart } = require("../controllers/CartControllers");
const { VerifyToken } = require("../middlewares");
const router = express.Router();


router.get("/Get-user-cart", getUserCart);
router.post("/Add-to-cart",addToCart);
router.delete('/Remove-from-cart',VerifyToken , removefromCart);

module.exports = router;
