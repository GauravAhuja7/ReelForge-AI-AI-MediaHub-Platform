import mongoose from "mongoose";

/**
 * User Model Schema for FeeltoReel AI Platform
 * Defines the structure for user accounts including subscription details and usage limits
 */
const UserSchema = new mongoose.Schema({
  // Basic user information
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  
  // Authentication - password may be null for OAuth users
  password: { 
    type: String 
  },
  
  // User role - currently all users are admins of their own account
  role: { 
    type: String, 
    enum: ["user", "admin"], 
    default: "admin" 
  },
  
  // Usage limits and quotas based on subscription plan
  credits: { 
    type: Number, 
    default: 1 // Free: 1 conversion/day, Pro: 5, Pro-Plus: unlimited
  },
  
  maxPromptWords: { 
    type: Number, 
    default: 50 // Limits prompt length based on subscription plan
  },
  
  maxVideoLength: { 
    type: Number, 
    default: 10 // Default video limit in seconds
  },
  
  maxAudioLength: { 
    type: Number, 
    default: 30 // Default audio limit in seconds
  },
  
  // Subscription information
  subscription: {
    plan: { 
      type: String, 
      enum: ["free", "pro", "pro-plus"], 
      default: "free" 
    },
    expiresAt: { 
      type: Date, 
      default: null // null for free plan (never expires)
    },
  },
  
  // Timestamps
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

// TODO: Implement password hashing when bcrypt is properly configured
// UserSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// TODO: Implement password comparison method
// UserSchema.methods.comparePassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

// Export the model, using existing one if already compiled
export default mongoose.models.User || mongoose.model("User", UserSchema);
