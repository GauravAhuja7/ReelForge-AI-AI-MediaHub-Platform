// "use client";

// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { BackgroundBeams } from "@/components/ui/background-beams";

// export default function HomePage() {
//   const { data: session } = useSession();

//   return (
//     <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
//       {/* 🎥 Background Video */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover opacity-30"
//       >
//         <source src="/background-video.mp4" type="video/mp4" />
//       </video>

//       {/* ⚡ Animated Background Lines */}
//       <BackgroundBeams />

//       {/* 🌟 Centered Content */}
//       <div className="relative z-10 text-center max-w-2xl">
//         {/* 🚀 Animated App Name */}
//         <motion.h1
//           className="text-5xl md:text-7xl font-extrabold tracking-wider"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.2 }}
//         >
//           FeelToReel AI
//         </motion.h1>

//         {/* 📝 Rotating Quotes & Comments */}
//         <motion.p
//           className="mt-4 text-lg italic opacity-80"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1, duration: 1 }}
//         >
//           &quot;Transform your words into stunning videos &amp; lifelike audio.&quot;
//         </motion.p>

//         {/* 🌟 Buttons */}
//         <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
//           <Link href="/subscription">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-transparent border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300"
//             >
//               View Our Pricing
//             </motion.button>
//           </Link>

//           {/* ✅ Show different buttons based on login state */}
//           {session ? (
//             <>
//               <Link href="/subscription">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="bg-blue-500 px-6 py-3 rounded-full text-white hover:bg-blue-600 transition-all duration-300"
//                 >
//                   Upgrade Your Plan
//                 </motion.button>
//               </Link>
//               <Link href="/upload">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="bg-green-500 px-6 py-3 rounded-full text-white hover:bg-green-600 transition-all duration-300"
//                 >
//                   Generate
//                 </motion.button>
//               </Link>
//             </>
//           ) : (
//             <Link href="/login">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-green-500 px-6 py-3 rounded-full text-white hover:bg-green-600 transition-all duration-300"
//               >
//                 Login / Sign Up to use our AI Tools
//               </motion.button>
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Neumorphic Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#121212] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            {/* Neumorphic shapes */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gray-800 shadow-[inset_-8px_-8px_12px_rgba(255,255,255,0.05),inset_8px_8px_12px_rgba(0,0,0,0.5)]"></div>
            <div className="absolute top-3/4 right-1/4 w-48 h-48 rounded-full bg-gray-800 shadow-[inset_-8px_-8px_12px_rgba(255,255,255,0.05),inset_8px_8px_12px_rgba(0,0,0,0.5)]"></div>
            <div className="absolute bottom-1/4 left-2/3 w-40 h-40 rounded-full bg-gray-800 shadow-[inset_-8px_-8px_12px_rgba(255,255,255,0.05),inset_8px_8px_12px_rgba(0,0,0,0.5)]"></div>
            <div className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full bg-gray-800 shadow-[inset_-8px_-8px_12px_rgba(255,255,255,0.05),inset_8px_8px_12px_rgba(0,0,0,0.5)]"></div>
          </div>
        </div>
      </div>

      {/* 🌟 Centered Content */}
      <div className="relative z-10 text-center max-w-2xl px-6">
        {/* 🚀 Animated App Name */}
        <motion.div
          className="p-8 rounded-2xl bg-gray-850 shadow-[5px_5px_15px_rgba(0,0,0,0.5),-5px_-5px_15px_rgba(255,255,255,0.05)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            FeelToReel AI
          </h1>

          {/* 📝 Rotating Quotes & Comments */}
          <motion.p
            className="mt-4 text-lg italic text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            &quot;Transform your words into stunning videos &amp; lifelike audio.&quot;
          </motion.p>

          {/* 🌟 Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/subscription">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-800 px-6 py-3 rounded-xl text-gray-200 shadow-[5px_5px_10px_rgba(0,0,0,0.5),-3px_-3px_10px_rgba(255,255,255,0.05)] hover:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.5),inset_-3px_-3px_10px_rgba(255,255,255,0.05)] transition-all duration-300"
              >
                View Our Pricing
              </motion.button>
            </Link>

            {/* ✅ Show different buttons based on login state */}
            {session ? (
              <>
                <Link href="/subscription">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-800 px-6 py-3 rounded-xl text-blue-400 shadow-[5px_5px_10px_rgba(0,0,0,0.5),-3px_-3px_10px_rgba(255,255,255,0.05)] hover:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.5),inset_-3px_-3px_10px_rgba(255,255,255,0.05)] transition-all duration-300"
                  >
                    Upgrade Your Plan
                  </motion.button>
                </Link>
                <Link href="/upload">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-800 px-6 py-3 rounded-xl text-purple-400 shadow-[5px_5px_10px_rgba(0,0,0,0.5),-3px_-3px_10px_rgba(255,255,255,0.05)] hover:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.5),inset_-3px_-3px_10px_rgba(255,255,255,0.05)] transition-all duration-300"
                  >
                    Generate
                  </motion.button>
                </Link>
              </>
            ) : (
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 px-6 py-3 rounded-xl text-purple-400 shadow-[5px_5px_10px_rgba(0,0,0,0.5),-3px_-3px_10px_rgba(255,255,255,0.05)] hover:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.5),inset_-3px_-3px_10px_rgba(255,255,255,0.05)] transition-all duration-300"
                >
                  Login / Sign Up to use our AI Tools
                </motion.button>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}