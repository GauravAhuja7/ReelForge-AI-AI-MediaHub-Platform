import mongoose from "mongoose";

/**
 * Video Model Schema for FeeltoReel AI Platform
 * Represents AI-generated videos with metadata, generation status, and user associations
 * Tracks the complete lifecycle from prompt submission to video completion
 */
const VideoSchema = new mongoose.Schema({
  // User association
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    index: true // Index for faster user-based queries
  },
  
  // AI generation details
  modelUsed: { 
    type: String, 
    required: true,
    trim: true // AI model used for generation (e.g., "Tavus", "RunwayML")
  },
  
  prompt: { 
    type: String, 
    required: true,
    trim: true // Original text prompt used for video generation
  },
  
  // Video identification and storage
  videoId: { 
    type: String, 
    required: true,
    trim: true // External video ID from AI service or storage provider
  },
  
  videoUrl: { 
    type: String, 
    required: true,
    trim: true // Direct URL to the generated video file
  },
  
  // Generation status tracking
  status: { 
    type: String, 
    enum: ["queued", "ready"], 
    default: "queued", // "queued": processing, "ready": available for download
    index: true // Index for status-based queries
  },
  
  // Video specifications
  duration: { 
    type: Number, 
    required: true,
    min: 1 // Video duration in seconds
  },
  
  resolution: { 
    type: String, 
    default: "720p" // Video resolution (720p, 1080p, etc.)
  },
  
  // Timestamps
  createdAt: { 
    type: Date, 
    default: Date.now,
    index: true // Index for time-based sorting and queries
  },
}, {
  // Schema options
  timestamps: true, // Automatically adds createdAt and updatedAt
});

// Indexes for optimal query performance
VideoSchema.index({ userId: 1, createdAt: -1 }); // User's videos sorted by date
VideoSchema.index({ status: 1, createdAt: -1 }); // Status-based queries with date sorting

// Export the model, using existing one if already compiled
export default mongoose.models.Video || mongoose.model("Video", VideoSchema);
