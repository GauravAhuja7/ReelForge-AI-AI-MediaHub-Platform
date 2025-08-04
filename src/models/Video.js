import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  modelUsed: { type: String, required: true }, // AI Model used for generation
  prompt: { type: String, required: true },
  videoId: { type: String, required: true }, // Cloudinary or AI API URL
  videoUrl: { type: String, required: true }, // Cloudinary or AI API URL
  status: { type: String, enum: ["queued", "ready"], default: "queued" },
  duration: { type: Number, required: true }, // In seconds
  resolution: { type: String, default: "720p" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Video || mongoose.model("Video", VideoSchema);
