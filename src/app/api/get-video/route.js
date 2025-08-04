import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const videoId = request.nextUrl.searchParams.get("videoId");
  if (!videoId) {
    return NextResponse.json({ error: "Missing videoId" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://tavusapi.com/v2/videos/${videoId}`, {
      headers: {
        "x-api-key": process.env.TAVUS_AI_API,
      },
    });

    if (!res.ok) {
      throw new Error(`Tavus API Error: ${res.statusText}`);
    }

    const data = await res.json();

    if (data.status === "ready") {
      return NextResponse.json({
        status: "ready",
        videoId: data.video_id,
        hostedUrl: data.hosted_url,
        downloadUrl: data.download_url,
      });
    }

    return NextResponse.json({ status: "queued" });
  } catch (error) {
    console.error("❌ Error fetching Tavus video status:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
