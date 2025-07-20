const express = require("express");
const { getUserCart, addToCart,removefromCart,clearCart } = require("../controllers/CartControllers");
const { VerifyToken } = require("../middlewares");
const router = express.Router();


router.get("/Get-user-cart", getUserCart);
router.post("/Add-to-cart",addToCart);
router.delete('/Remove-from-cart',VerifyToken , removefromCart);
router.delete("/clear-cart",VerifyToken,clearCart);
module.exports = router;
