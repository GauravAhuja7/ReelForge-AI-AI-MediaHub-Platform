// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import Razorpay from "razorpay";
// import Payment from "@/models/Payment";
// import { connectToDatabase } from "@/lib/db";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export async function POST(req) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { plan, amount } = await req.json();
//     await connectToDatabase();

//     // ✅ Create Razorpay order
//     const order = await razorpay.orders.create({
//       amount: Math.round(amount * 100), // Convert to smallest currency unit
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//       notes: {
//         userId: session.user.id,
//         plan,
//       },
//     });

//     // ✅ Store payment details in DB
//     const newPayment = await Payment.create({
//       userId: session.user.id,
//       razorpayOrderId: order.id,
//       amount,
//       plan,
//       status: "pending",
//     });

//     return NextResponse.json({
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency,
//       dbPaymentId: newPayment._id,
//     });
//   } catch (error) {
//     console.error("Error creating payment order:", error);
//     return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import { connectToDatabase } from "@/lib/db";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { plan, amount } = await req.json();
    if (!plan || !amount) {
      return NextResponse.json({ error: "Plan and amount required" }, { status: 400 });
    }

    // Normalize the plan value to match allowed enums: "free", "pro", "pro-plus"
    const planMapping = {
      free: "free",
      plus: "pro", // Map "plus" to "pro"
      "pro-plus": "pro-plus",
    };

    const normalizedPlan = planMapping[plan.toLowerCase()];
    if (!normalizedPlan) {
      return NextResponse.json({ error: "Invalid plan value" }, { status: 400 });
    }

    await connectToDatabase();

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: { userId: session.user.id, plan: normalizedPlan },
    });

    // Store payment details in DB
    const newPayment = await Payment.create({
      userId: session.user.id,
      razorpayOrderId: order.id,
      amount,
      plan: normalizedPlan,
      status: "pending",
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      dbPaymentId: newPayment._id,
    });
  } catch (error) {
    console.error("❌ Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
