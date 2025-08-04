// // import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// // import bcrypt from "bcryptjs";
// import { connectToDatabase } from "./db";
// import User from "../models/User";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),

//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials || !credentials.email || !credentials.password) {
//           throw new Error("Missing email or password");
//         }

//         try {
//           await connectToDatabase();
//           const user = await User.findOne({ email: credentials.email }).select("+password");


//           if (!user) {
//             throw new Error("No user found with this email");
//           }
//           console.log(user);
//           console.log(user.password);
//           console.log(credentials.password);

//         //   const isValid = await bcrypt.compare(credentials.password, user.password);
//           const isValid = credentials.password ==user.password ? true : false ;

//           if (!isValid) {
//             throw new Error("Invalid password");
//           }

//           return {
//             id: user._id.toString(),
//             email: user.email,
//             role: user.role,
//           };
//         } catch (error) {
//           console.error("Auth error:", error);
//           throw error;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.email = user.email;
//         token.credits = user.credits;
//         token.subscription = user.subscription;
//         token.maxPromptWords = user.maxPromptWords;
//         token.maxVideoLength = user.maxVideoLength;
//         token.maxAudioLength = user.maxAudioLength;
//         token.name = user.name;
//         token.role = user.role;
//         token.id = user.id;
//       }


//       if (account?.provider === "google") {
//         await connectToDatabase();
//         let googleUser = await User.findOne({ email: token.email });

//         if (!googleUser) {
//           googleUser = await User.create({
//             name: token.name,
//             email: token.email,
//             password: null, // Google users don't have a password
//             subscription: { plan: "free", expiresAt: null },
//           });
//         }

//         token.id = googleUser._id.toString();
//       }

//       return token;
//     },

     

   

//     async session({ session, token }) {
//       if (session.user) {
//         session.user.email = token.email;
//         session.user.credits = token.credits;
//         session.user.subscription = token.subscription;
//         session.user.maxPromptWords = token.maxPromptWords;
//         session.user.maxVideoLength = token.maxVideoLength;
//         session.user.maxAudioLength = token.maxAudioLength;
//         session.user.name = token.name;
//         session.user.role = token.role;
//         session.user.id = token.id;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//     error: "/login",
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60,
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };



import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "./db";
import User from "../models/User";

export const authOptions = {
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Credentials Provider (Manual Login)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials.email }).select("+password");
          if (!user) throw new Error("No user found with this email");

          const isValid = credentials.password === user.password;
          if (!isValid) throw new Error("Invalid password");

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            credits: user.credits,
            subscription: user.subscription,
            maxPromptWords: user.maxPromptWords,
            maxVideoLength: user.maxVideoLength,
            maxAudioLength: user.maxAudioLength,
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw new Error("Internal Server Error");
        }
      },
    }),
  ],

  callbacks: {
    // JWT Callback: Customize token creation
    async jwt({ token, user, account }) {
      // If user is present (new login), add user details to token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.credits = user.credits;
        token.subscription = user.subscription;
        token.maxPromptWords = user.maxPromptWords;
        token.maxVideoLength = user.maxVideoLength;
        token.maxAudioLength = user.maxAudioLength;
      }

      // Google User Handling (Upsert user in database if missing)
      if (account?.provider === "google") {
        await connectToDatabase();
        let googleUser = await User.findOne({ email: token.email });

        if (!googleUser) {
          googleUser = await User.create({
            name: token.name,
            email: token.email,
            password: null, // No password for Google users
            subscription: { plan: "free", expiresAt: null },
            credits: 0,
            maxPromptWords: 150,
            maxVideoLength: 10,
            maxAudioLength: 10,
          });
        }

        token.id = googleUser._id.toString();
        token.credits = googleUser.credits;
        token.subscription = googleUser.subscription;
        token.maxPromptWords = googleUser.maxPromptWords;
        token.maxVideoLength = googleUser.maxVideoLength;
        token.maxAudioLength = googleUser.maxAudioLength;
      }

      return token;
    },

    // Session Callback: Make all token fields available in the session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.credits = token.credits;
        session.user.subscription = token.subscription;
        session.user.maxPromptWords = token.maxPromptWords;
        session.user.maxVideoLength = token.maxVideoLength;
        session.user.maxAudioLength = token.maxAudioLength;
      }
      return session;
    },
  },

  // Custom Pages: Redirect to custom login page
  pages: {
    signIn: "/login",
    error: "/login",
  },

  // Session Configuration (JWT Strategy for better scaling)
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};
