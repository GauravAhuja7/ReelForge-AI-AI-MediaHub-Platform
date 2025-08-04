import {  NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    // Fetch video records for the logged-in user
    const videos = await Video.find({ userId: session.user.id }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, videos });
  } catch (error) {
    console.error("❌ Error fetching videos:", error);
    return NextResponse.json({ error: "Failed to fetch video records" }, { status: 500 });
  }
}
