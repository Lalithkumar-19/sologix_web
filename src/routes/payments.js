const express=require("express");
const { VerifyToken } = require("../middlewares");
const { verifyPayment, createOrder } = require("../controllers/PaymentController");
const router=express.Router();


router.post("/verify-payment",VerifyToken, verifyPayment )
router.post('/create-order', VerifyToken,createOrder);