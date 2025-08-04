import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Audio from "@/models/Audio";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    // Fetch audio records for the logged-in user
    const audios = await Audio.find({ userId: session.user.id }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, audios });
  } catch (error) {
    console.error("❌ Error fetching audios:", error);
    return NextResponse.json({ error: "Failed to fetch audio records" }, { status: 500 });
  }
}
