import mongoose from "mongoose";
// import bcrypt from "bcryptjs";  // ✅ Correct!
// import  { Schema, model, models } from "mongoose";


const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {type: String }, // Required for email/password authentication
  role: { type: String, enum: ["user", "admin"], default: "admin" }, // Every user is an admin of their account
  credits: { type: Number, default: 1 }, // Free: 1 conversion/day, Pro: 5, ProPlus: unlimited
  maxPromptWords: { type: Number, default: 50 }, // Limits prompt length based on plan
  maxVideoLength: { type: Number, default: 10 }, // Default video limit in seconds
  maxAudioLength: { type: Number, default: 30 }, // Default audio limit in seconds
  subscription: {
    plan: { type: String, enum: ["free", "pro", "pro-plus"], default: "free" },
    expiresAt: { type: Date, default: null },
  },
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving
// UserSchema.pre("save", async function (next) {
//     // if (this.isModified("password")) {
//     //   this.password = await bcrypt.hash(this.password, 10);
//     // }
//     next();
//   });

// Compare password method
// UserSchema.methods.comparePassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

export default mongoose.models.User || mongoose.model("User", UserSchema);
