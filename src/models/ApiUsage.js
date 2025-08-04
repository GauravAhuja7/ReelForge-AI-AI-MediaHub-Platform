import mongoose from "mongoose";

const ApiUsageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: () => new Date().toISOString().split("T")[0] }, // Tracks daily usage
  textToVideoCount: { type: Number, default: 0 }, // Number of video generations today
  textToAudioCount: { type: Number, default: 0 }, // Number of audio generations today
});

export default mongoose.models.ApiUsage || mongoose.model("ApiUsage", ApiUsageSchema);
