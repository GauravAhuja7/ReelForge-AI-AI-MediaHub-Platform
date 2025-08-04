import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

function VideoPopup({ videoId, onClose }) {
  const [progress, setProgress] = useState(0);
  
  // Simulate processing progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black bg-opacity-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="w-full max-w-md rounded-3xl bg-gradient-to-br from-gray-900 to-black p-1"
      >
        <div className="rounded-3xl bg-black p-8 shadow-inner relative overflow-hidden border border-gray-800">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-purple-900 opacity-10 blur-2xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-blue-900 opacity-10 blur-2xl"></div>
          
          {/* Neuromorphic card header */}
          <div className="flex justify-center mb-6">
            <motion.div 
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ yoyo: Infinity, duration: 2 }}
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-lg border border-gray-700"
              style={{ boxShadow: "6px 6px 12px #0c0c0c, -6px -6px 12px #222222" }}
            >
              <span className="text-4xl">🎬</span>
            </motion.div>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4"
          >
            Video Generation Started!
          </motion.h2>
          
          {/* Progress bar - neuromorphic style */}
          <div className="relative h-4 rounded-full bg-gray-800 shadow-inner mb-6 mt-8"
               style={{ boxShadow: "inset 2px 2px 5px #0c0c0c, inset -2px -2px 5px #222222" }}>
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
            ></motion.div>
            <div className="absolute w-full text-center text-xs text-gray-400 -bottom-6">
              {progress}% Complete
            </div>
          </div>
          
          <p className="text-center text-gray-400 my-8">
            Your video is being processed. You can track its progress on the{" "}
            <Link href="/my-video" className="font-medium text-blue-400 hover:text-blue-300">
              My Videos
            </Link>{" "}
            page.
          </p>
          
          {/* Neuromorphic buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-gray-900 text-gray-300 font-medium transition-all duration-300"
              style={{ boxShadow: "5px 5px 10px #0c0c0c, -5px -5px 10px #222222" }}
            >
              Close
            </button>
            
            <Link href="/my-video">
              <button 
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium transition-all duration-300"
                style={{ boxShadow: "5px 5px 10px #0c0c0c, -5px -5px 10px #222222" }}
              >
                <div className="flex items-center gap-2">
                  <span>📺</span>
                  <span>Go to My Videos</span>
                </div>
              </button>
            </Link>
          </div>
          
          {/* Video ID display with glow effect */}
          <div className="mt-8 text-center">
            <span className="px-4 py-1 rounded-full bg-gray-800 text-xs text-gray-400 inline-block"
                  style={{ boxShadow: "inset 2px 2px 5px #0c0c0c, inset -2px -2px 5px #222222" }}>
              Video ID: {videoId || "N/A"}
            </span>
          </div>
          
          {/* Pulsing dots to indicate processing */}
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-blue-500"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default VideoPopup;