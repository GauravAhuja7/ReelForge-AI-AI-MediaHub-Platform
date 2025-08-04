import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Payment from "@/models/Payment";
import User from "@/models/User";

export async function POST(req) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id } = body; // Ignoring signature verification

    if (!razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json({ error: "Invalid payment data" }, { status: 400 });
    }

    await connectToDatabase();

    // ✅ Retrieve order from DB
    const paymentRecord = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
    if (!paymentRecord) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // ✅ Update payment status in DB
    paymentRecord.razorpayPaymentId = razorpay_payment_id;
    paymentRecord.status = "completed";
    await paymentRecord.save();

    // ✅ Determine plan-based limits
    let planSettings = {};
    if (paymentRecord.plan === "pro") {
      planSettings = {
        "subscription.plan": "pro",
        "subscription.expiresAt": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        credits: 5,
        maxPromptWords: 100,
        maxVideoLength: 20,
        maxAudioLength: 45,
      };
    } else if (paymentRecord.plan === "pro-plus") {
      planSettings = {
        "subscription.plan": "pro-plus",
        "subscription.expiresAt": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        credits: 20,
        maxPromptWords: 500,
        maxVideoLength: 30,
        maxAudioLength: 60,
      };
    }

    // ✅ Upgrade user subscription & update limits
    await User.findByIdAndUpdate(paymentRecord.userId, planSettings);

    console.log(`✅ Subscription updated for user ${paymentRecord.userId} to ${paymentRecord.plan}`);
    return NextResponse.json({ success: true, message: "Payment verified & subscription updated" });
  } catch (error) {
    console.error("❌ Error verifying payment:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
