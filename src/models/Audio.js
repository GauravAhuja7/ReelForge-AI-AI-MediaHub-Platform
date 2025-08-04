import mongoose from "mongoose";

const AudioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  modelUsed: { type: String, required: true }, // AI Model used for generation
  prompt: { type: String, required: true },
  audioUrl: { type: String, required: true }, // Cloudinary or AI API URL
  duration: { type: Number, required: true }, // In seconds
  voiceType: { type: String, default: "default" }, // Male, Female, Custom
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Audio || mongoose.model("Audio", AudioSchema);
