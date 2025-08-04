// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../../../lib/auth";
// import { connectToDatabase } from "../../../../../lib/db";
// import Video from "../../../../../models/Video";
// import ApiUsage from "../../../../../models/ApiUsage";
// import { callAIModel } from "@/lib/aiModels";
// import { generateTavusVideo } from "@/lib/tavusModel";

// export async function POST(request) {
//   const session = await getServerSession(authOptions);

//   if (!session || !session.user) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const { prompt, model, duration, resolution } = await request.json();

//   try {
//     await connectToDatabase();

//     if (!session.user.subscription) {
//       session.user.subscription = { plan: "free", expiresAt: null };
//     }

//     console.log("📌 Received Video Generation Request:", { model, prompt, duration, resolution });

//     // Check API usage limit
//     const today = new Date().toISOString().split("T")[0];
//     let usage = await ApiUsage.findOne({ userId: session.user.id, date: today });

//     if (!usage) {
//       usage = await ApiUsage.create({ userId: session.user.id });
//     }

//     const maxLimit = { free: 1, pro: 5, "pro-plus": Infinity };
//     const userPlan = session.user.subscription.plan || "free";

//     // if (usage.textToVideoCount >= maxLimit[userPlan]) {
//     //   return NextResponse.json({ error: "Daily video limit reached. Upgrade your plan." }, { status: 403 });
//     // }

//     let videoUrl;

//     // Use Tavus AI if the model is "tavus"
//     if (model === "Tavus") {
//       console.log("🔄 Using Tavus AI for video generation...");
//       const tavusResponse = await generateTavusVideo(prompt);
//       if (tavusResponse.error) {
//         return NextResponse.json({ error: "Tavus video generation failed." }, { status: 500 });
//       }
//       videoUrl = tavusResponse.download_url;
//     } else {
//       console.log("🔄 Using custom AI model...");
//       videoUrl = await callAIModel(model, prompt, "textToVideo");
//     }

//     if (!videoUrl) {
//       return NextResponse.json({ error: "Video URL not found" }, { status: 500 });
//     }

//     // Store the generated video in the database
//     const videoRecord = await Video.create({
//       userId: session.user.id,
//       modelUsed: model,
//       prompt,
//       videoUrl,
//       duration,
//       resolution,
//     });

//     // Update API usage count
//     usage.textToVideoCount += 1;
//     await usage.save();

//     console.log("✅ Video Successfully Generated:", videoUrl);
//     return NextResponse.json({ videoUrl, videoId: videoRecord._id }, { status: 200 });
//   } catch (error) {
//     console.error("❌ Error generating video:", error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { connectToDatabase } from "../../../../../lib/db";
import Video from "../../../../../models/Video";
import ApiUsage from "../../../../../models/ApiUsage";
import { generateTavusVideo } from "@/lib/tavusModel";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { prompt, model, duration, resolution } = await request.json();

  try {
    await connectToDatabase();

    console.log("📌 Received Video Generation Request:", { model, prompt });

    // Check API usage limit
    const today = new Date().toISOString().split("T")[0];
    let usage = await ApiUsage.findOne({ userId: session.user.id, date: today });

    if (!usage) {
      usage = await ApiUsage.create({ userId: session.user.id });
    }

    // Call Tavus AI and get video_id (async)
    const tavusResponse = await generateTavusVideo(prompt);
    if (tavusResponse.error) {
      return NextResponse.json({ error: "Tavus video generation failed." }, { status: 500 });
    }

    const { video_id, status, hosted_url, created_at } = tavusResponse;

    // Save the video record with status = "queued"
    const videoRecord = await Video.create({
      userId: session.user.id,
      modelUsed: model,
      prompt,
      duration,
      resolution,
      videoId: video_id,
      videoUrl: hosted_url,
      status, // "queued"
      createdAt: created_at,
    });

    usage.textToVideoCount += 1;
    await usage.save();

    console.log("✅ Tavus Video Request Stored:", video_id);
    return NextResponse.json({ videoId: video_id, status }, { status: 202 }); // 202 for async
  } catch (error) {
    console.error("❌ Error generating video:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
