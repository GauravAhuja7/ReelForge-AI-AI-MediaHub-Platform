import mongoose from "mongoose";

/**
 * MongoDB Database Connection Utility
 * 
 * Provides a singleton connection to MongoDB using Mongoose
 * Implements connection caching to avoid multiple connections in serverless environments
 * Optimized for Next.js API routes and serverless functions
 */

// Get MongoDB connection string from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Validate that MongoDB URI is provided
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global connection cache to prevent multiple connections
 * In serverless environments, functions may be called multiple times
 * Caching prevents creating new connections on each invocation
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Establishes connection to MongoDB database
 * Uses cached connection if available, otherwise creates new connection
 * 
 * @returns {Promise<mongoose.Connection>} - MongoDB connection instance
 * @throws {Error} - When connection fails or MongoDB URI is invalid
 */
export async function connectToDatabase() {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection if no cached promise exists
  if (!cached.promise) {
    const connectionOptions = {
      bufferCommands: true,        // Enable command buffering
      maxPoolSize: 10,             // Maximum number of connections in pool
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
      socketTimeoutMS: 45000,      // Socket timeout
      family: 4,                   // Use IPv4, skip trying IPv6
    };

    // Create connection promise
    cached.promise = mongoose
      .connect(MONGODB_URI, connectionOptions)
      .then((mongooseInstance) => {
        console.log("✅ Connected to MongoDB successfully");
        return mongooseInstance.connection;
      });
  }

  try {
    // Wait for connection to be established
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset promise cache on connection failure
    cached.promise = null;
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }

  return cached.conn;
}
