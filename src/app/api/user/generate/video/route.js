import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { connectToDatabase } from "../../../../../lib/db";
import Video from "../../../../../models/Video";
import ApiUsage from "../../../../../models/ApiUsage";
import { generateTavusVideo } from "@/lib/tavusModel";

/**
 * Video Generation API Route
 * POST /api/user/generate/video
 * 
 * Handles text-to-video generation requests using Tavus AI
 * Creates video records and tracks API usage for authenticated users
 * Returns video ID and status for async processing
 * 
 * @param {Request} request - HTTP request containing video generation parameters
 * @returns {NextResponse} JSON response with video generation status
 */
export async function POST(request) {
  // Verify user authentication
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Authentication required. Please log in to generate videos." }, 
      { status: 401 }
    );
  }

  try {
    // Extract video generation parameters from request
    const { prompt, model, duration, resolution } = await request.json();

    // Validate required parameters
    if (!prompt || !model) {
      return NextResponse.json(
        { error: "Missing required parameters. Prompt and model are required." },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    console.log("📌 Video Generation Request:", { 
      userId: session.user.id,
      model, 
      promptLength: prompt.length 
    });

    // Track daily API usage for this user
    const today = new Date().toISOString().split("T")[0];
    let usage = await ApiUsage.findOne({ 
      userId: session.user.id, 
      date: today 
    });

    // Create usage record if none exists for today
    if (!usage) {
      usage = await ApiUsage.create({ 
        userId: session.user.id,
        date: today 
      });
    }

    // Generate video using Tavus AI service
    console.log("🔄 Initiating video generation with Tavus AI...");
    const tavusResponse = await generateTavusVideo(prompt);
    
    // Handle AI service errors
    if (tavusResponse.error) {
      console.error("❌ Tavus AI Error:", tavusResponse.error);
      return NextResponse.json(
        { error: "Video generation service temporarily unavailable. Please try again later." }, 
        { status: 500 }
      );
    }

    // Extract video information from Tavus response
    const { video_id, status, hosted_url, created_at } = tavusResponse;

    // Save video record to database
    const videoRecord = await Video.create({
      userId: session.user.id,
      modelUsed: model,
      prompt,
      duration: duration || 10, // Default duration if not provided
      resolution: resolution || "720p", // Default resolution if not provided
      videoId: video_id,
      videoUrl: hosted_url,
      status, // Usually "queued" initially
      createdAt: created_at,
    });

    // Update user's daily usage count
    usage.textToVideoCount += 1;
    await usage.save();

    console.log("✅ Video generation request processed successfully:", {
      videoId: video_id,
      status,
      databaseId: videoRecord._id
    });

    // Return success response with video tracking information
    return NextResponse.json(
      { 
        videoId: video_id, 
        status,
        message: "Video generation started successfully. Check back for updates."
      }, 
      { status: 202 } // 202 Accepted - request accepted for processing
    );

  } catch (error) {
    // Log detailed error for debugging
    console.error("❌ Video generation error:", {
      message: error.message,
      stack: error.stack,
      userId: session?.user?.id
    });

    // Return user-friendly error message
    return NextResponse.json(
      { 
        error: "An unexpected error occurred during video generation. Please try again.",
        // Include error details in development mode only
        ...(process.env.NODE_ENV === 'development' && { details: error.message })
      }, 
      { status: 500 }
    );
  }
}
