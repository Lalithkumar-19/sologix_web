const express=require("express");
const { VerifyToken } = require("../middlewares");
const { verifyPayment, createOrder, Store_Payments, GetPayments, Get_all_payments } = require("../controllers/PaymentController");
const router=express.Router();


router.post("/verify-payment",VerifyToken, verifyPayment )
router.post('/create-order', VerifyToken,createOrder);

router.post("/store-payments",VerifyToken,Store_Payments);
router.get("/get-user-payments",VerifyToken,GetPayments);

router.get("/get-all-payments",Get_all_payments);

module.exports = router;