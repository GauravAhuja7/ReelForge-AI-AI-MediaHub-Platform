import {  NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { callAIModel } from "../../../../../lib/aiModels";
import { connectToDatabase } from "../../../../../lib/db";
import Audio from "../../../../../models/Audio";
import ApiUsage from "../../../../../models/ApiUsage";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { prompt, model, duration, voiceType } = await request.json();

  try {
    await connectToDatabase();

    if (!session.user.subscription) {
      session.user.subscription = { plan: "free", expiresAt: null };
    }

    // ✅ Check API usage limit
    const today = new Date().toISOString().split("T")[0];
    let usage = await ApiUsage.findOne({ userId: session.user.id, date: today });

    if (!usage) {
      usage = await ApiUsage.create({ userId: session.user.id });
    }

    const maxLimit = { free: 1, pro: 5, "pro-plus": Infinity };
    // if (usage.textToAudioCount >= maxLimit[session.user.subscription.plan]) {
    //   return NextResponse.json({ error: "Daily audio limit reached. Upgrade your plan." }, { status: 403 });
    // }


    const audioUrls = [
      "https://videos.pexels.com/video-files/4549682/4549682-sd_640_360_30fps.mp4",
      "https://videos.pexels.com/video-files/4828605/4828605-sd_960_506_25fps.mp4",
      "https://videos.pexels.com/video-files/3626151/3626151-sd_506_960_25fps.mp4",
      "https://videos.pexels.com/video-files/3627092/3627092-sd_506_960_25fps.mp4",
      "https://videos.pexels.com/video-files/4114358/4114358-sd_640_360_25fps.mp4",
      "https://videos.pexels.com/video-files/5082031/5082031-sd_960_506_25fps.mp4",
      "https://videos.pexels.com/video-files/4888376/4888376-sd_640_360_24fps.mp4",
      "https://videos.pexels.com/video-files/5083562/5083562-sd_960_506_25fps.mp4",
      "https://videos.pexels.com/video-files/4110897/4110897-sd_640_360_25fps.mp4",
      "https://videos.pexels.com/video-files/5083554/5083554-sd_960_506_25fps.mp4",
      "https://videos.pexels.com/video-files/5082599/5082599-sd_506_960_25fps.mp4",
      "https://videos.pexels.com/video-files/5083552/5083552-sd_506_960_25fps.mp4",
      "https://videos.pexels.com/video-files/6994619/6994619-sd_640_360_30fps.mp4",
      "https://videos.pexels.com/video-files/5585952/5585952-sd_640_360_25fps.mp4",
    ];

    // Select a random video URL
    const randomIndex = Math.floor(Math.random() * videoUrls.length);

    // ✅ Generate audio using AI model
    // const audioUrl = await callAIModel(model, prompt, "textToAudio");
    const audioUrl = audioUrls[randomIndex];
    // ✅ Store the generated audio in the database
    const audioRecord = await Audio.create({
      userId: session.user.id,
      modelUsed: model,
      prompt,
      audioUrl,
      duration,
      voiceType,
    });

    // ✅ Update API usage count
    usage.textToAudioCount += 1;
    await usage.save();

    return NextResponse.json({ audioUrl, audioId: audioRecord._id }, { status: 200 });
  } catch (error) {
    console.error("Error generating audio:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
