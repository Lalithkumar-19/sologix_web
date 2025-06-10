const { Schema, model } = require("mongoose");

const PaymentsSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
  razorpay_payment_id: { type: String, required: true },
  razorpay_order_id: { type: String, required: true },
  amount_paid: { type: Number, required: true },
  productNames: [{ type: String, required: true }],
  Date: { type: Date, default: Date.now() },
});

const PaymentModel = model("Payments", PaymentsSchema);
module.exports = PaymentModel;
