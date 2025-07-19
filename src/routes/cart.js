const express = require("express");
const { getUserCart, addToCart } = require("../controllers/CartControllers");
const router = express.Router();


router.get("/Get-user-cart", getUserCart);
router.post("/Add-to-cart",addToCart);

module.exports = router;
