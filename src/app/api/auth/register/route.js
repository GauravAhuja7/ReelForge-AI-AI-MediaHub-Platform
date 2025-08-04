import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

/**
 * User Registration API Route
 * POST /api/auth/register
 * 
 * Creates a new user account with email and password authentication
 * Validates input, checks for existing users, and creates new user with default free plan
 * 
 * @param {Request} request - HTTP request object containing user registration data
 * @returns {NextResponse} JSON response with success/error message
 */
export async function POST(request) {
  try {
    // Extract registration data from request body
    const { name, email, password } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Password length validation
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Check if user already exists with this email
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 } // 409 Conflict status for duplicate resource
      );
    }

    // TODO: Hash password before saving when bcrypt is implemented
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with default settings
    const user = await User.create({
      name: name || "User", // Use provided name or default
      email: email.toLowerCase().trim(), // Normalize email
      password, // TODO: Replace with hashedPassword when bcrypt is implemented
      subscription: { 
        plan: "free", 
        expiresAt: null 
      },
    });

    // Return success response (excluding sensitive data)
    return NextResponse.json(
      { 
        message: "User registered successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          plan: user.subscription.plan
        }
      },
      { status: 201 }
    );

  } catch (error) {
    // Log error details for debugging
    console.error("Registration error:", {
      message: error.message,
      stack: error.stack
    });

    // Handle specific MongoDB errors
    if (error.code === 11000) {
      // Duplicate key error (email already exists)
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: validationErrors.join(', ') },
        { status: 400 }
      );
    }

    // Generic server error response
    return NextResponse.json(
      { error: "Failed to register user. Please try again later." },
      { status: 500 }
    );
  }
}
