import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: String, enum: ["free", "pro", "pro-plus"], required: true }, // Subscription plan
  amount: { type: Number, required: true }, // Payment amount in INR
  currency: { type: String, default: "INR" }, // Default currency
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  razorpayOrderId: { type: String, required: true, unique: true }, // Razorpay Order ID
  razorpayPaymentId: { type: String, default: null }, // Razorpay Payment ID (After payment)
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
