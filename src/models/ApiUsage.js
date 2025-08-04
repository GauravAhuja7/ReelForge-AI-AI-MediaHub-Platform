import mongoose from "mongoose";

/**
 * API Usage Model Schema for FeeltoReel AI Platform
 * Tracks daily usage counts for AI generation services per user
 * Used for enforcing subscription limits and monitoring usage patterns
 */
const ApiUsageSchema = new mongoose.Schema({
  // User association
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    index: true // Index for faster user-based queries
  },
  
  // Date tracking for daily usage limits
  date: { 
    type: Date, 
    default: () => new Date().toISOString().split("T")[0], // Stores date as YYYY-MM-DD
    index: true // Index for date-based queries and cleanup
  },
  
  // Usage counters for different AI services
  textToVideoCount: { 
    type: Number, 
    default: 0,
    min: 0 // Number of video generations used today
  },
  
  textToAudioCount: { 
    type: Number, 
    default: 0,
    min: 0 // Number of audio generations used today
  },
}, {
  // Schema options
  timestamps: true, // Automatically adds createdAt and updatedAt
});

// Compound index for efficient user-date queries
ApiUsageSchema.index({ userId: 1, date: 1 }, { unique: true }); // One record per user per day

// Export the model, using existing one if already compiled
export default mongoose.models.ApiUsage || mongoose.model("ApiUsage", ApiUsageSchema);
