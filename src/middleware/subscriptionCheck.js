import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Import NextAuth config
import ApiUsage from "../models/ApiUsage";

export const checkSubscriptionLimit = async (req, res, next) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id: userId, subscription } = session.user;

  if (!subscription || !subscription.plan) {
    return res.status(403).json({ error: "Subscription plan not found" });
  }

  const today = new Date().toISOString().split("T")[0];
  let usage = await ApiUsage.findOne({ userId, date: today });

  if (!usage) {
    usage = await ApiUsage.create({ userId });
  }

  const maxLimit = { free: 1, pro: 5, "pro-plus": Infinity };

  if (req.path.includes("/generate/video")) {
    if (usage.textToVideoCount >= maxLimit[subscription.plan]) {
      return res.status(403).json({ error: "Daily video limit reached. Upgrade your plan." });
    }
    usage.textToVideoCount += 1;
  }

  if (req.path.includes("/generate/audio")) {
    if (usage.textToAudioCount >= maxLimit[subscription.plan]) {
      return res.status(403).json({ error: "Daily audio limit reached. Upgrade your plan." });
    }
    usage.textToAudioCount += 1;
  }

  await usage.save();
  next();
};
