"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Vortex } from "../../components/ui/vortex";

function AudioContent() {
  const searchParams = useSearchParams();
  const encodedUrl = searchParams.get("url"); // Get audio URL from query params
  const audioUrl = encodedUrl ? decodeURIComponent(encodedUrl) : null; // Decode URL

  if (!audioUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white relative">
        {/* ✅ Background Effect */}
        <Vortex className="absolute inset-0 -z-10" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 text-center"
        >
          <h2 className="text-2xl font-bold text-red-400">Invalid audio URL</h2>
          <p className="text-gray-400 mt-2">Please provide a valid URL.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative p-6">
      {/* ✅ Background Effect */}
      <Vortex className="absolute inset-0 -z-10" />

      {/* ✅ Centered Content */}
      <motion.div 
        className="w-full max-w-3xl bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-4">
          🎵 AI Generated Audio
        </h2>
        
        {/* ✅ Audio Player - Centered */}
        <motion.audio 
          controls 
          autoPlay
          src={audioUrl} 
          className="w-full rounded-lg shadow-lg border border-blue-400"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
        />

        <p className="text-gray-400 mt-4 text-sm">
          📅 Created At: {new Date().toLocaleString()}
        </p>

        {/* ✅ Buttons - Centered Below Audio */}
        <div className="mt-6 flex space-x-4">
          <Link href="/upload">
            <motion.button 
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(34, 197, 94, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all"
            >
              🎶 Generate More
            </motion.button>
          </Link>

          <Link href="/">
            <motion.button 
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(59, 130, 246, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all"
            >
              🏠 Home
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function AudioPage() {
  return (
    <Suspense fallback={<div className="text-white text-center p-10">Loading...</div>}>
      <AudioContent />
    </Suspense>
  );
}
