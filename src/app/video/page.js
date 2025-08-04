// "use client";

// import { Suspense } from "react";
// import { useSearchParams } from "next/navigation";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { Vortex } from "@/components/ui/vortex";

// function VideoContent() {
//   const searchParams = useSearchParams();
//   const encodedUrl = searchParams.get("url");
//   // const videoUrl = 'https://tavus.video/bd1d645b11';
//   // const videoUrl = "https://tavus.video/31c0773a00";
//   const videoUrl = decodeURIComponent(encodedUrl);
//   // const videoUrl ="https://ai-avatar-videos-prod.s3.amazonaws.com/3679/bac4352b.mp4?AWSAccessKeyId=ASIAZX2SRGOR7YCZZSVU&Signature=MuvGJO4%2B6iF1fZz0Ae0o6n%2FdIrI%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEEkaCXVzLXdlc3QtMSJIMEYCIQCIEYrz%2B6bbKoJA6OzvqS8eKgYsw6i0KIpgzqYhrUO58AIhAMFtEfTeIaW%2BghAjqX09M%2FXE5OLSOXoQM8O82QwMTdGMKr4ECKL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAhoMNjY5NjUxMTIxMDU5IgwapPv96%2BzbHXv4hKkqkgSERS2gX0NKe7SA0TWgVIjcKfuzsqmdzIldU9WdtR5qF8CTD4k9p8vZ94LiVXlY%2FPSHqLQFtmtYxm3DjuKcZsHWNFll3YqtMSOLiDWPCn9zoGZpX%2F%2FxxblYJClF3slA0LL4Sx0wmoTyAKtE7KUmTsVWts2SEztOCQ7JOJs4FU1iTCRK4qnrIOGYKY16Snsi2cZiEh3F1I%2BNxwdjHSlFeo%2Bpw4%2FAwPGV%2B9MUDFvlUyjHCd2ZyjtugYPGkSKSTrgvIIoxyAgtmRE4ImihpVxv%2FfKee5LFvsMSxU4dXxNh%2BczW%2FBBnNqtCe5a2cWO5z4Gm%2F847tdiAh3QbyfXfSL7U4%2FKGCIdzgK3L1nHTnaiDlNv0ZrXNw8cgSTj8vzye8nIc9NEBshfzElauJTpQssDmcwcj2wAwUhXaGPOa8Ym%2F0Wgp%2BpEBldCqSfh0F4CVqY7vNmHT4RHnClnxDIAI%2B8miVh5n8zDwPYO3299hoAZxWnyig3tJJC9DbWtR8QTzJF5NkV5OV5uuXN3jp%2B6I2wDcIJMS5QnH0GafTHDrKJXm25BbJwUHC0mIR9Dr7tiKHa%2BRMi5UtGy8kDCzFAjjetWVZszz3ViYp07Wi7o2X3t0%2BxGpXVVczXQfU9%2Fz8J8Ajlu5cjWkE8kwEa6Y1BbGuR1vU9779klX0He2cq0riTPFc682C5VZgL3z%2BWUj%2BLI%2F1WREwvP43zDN1PS%2BBjqlAShVixSxM0239Z914RgO1GPh3Giu3Bj3cCUWQjxcz8plh5u8Jkrar1cGMHons7LFcwyBzVjGihOfzzCxm1uGlgdljYYbqYO1WxfFySO4qIykMMXm9SD2Rn1t3FkoXxxglCvIR35fyIYjdl4ku1mcpNmlZkAHIvJsJ9wixEmMdfvaoYldXFrj0lE9Nd8PcQRPlPiYgHqTJ8tqew4Kec4Ehr8GotF8LA%3D%3D&Expires=1743161045";
//   //   

//   // Check if it's a Tavus URL
//   const isTavusVideo = videoUrl.includes("tavus.video");

//   if (!videoUrl) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black text-white relative">
//         <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black -z-10" />
//         <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 -z-10" />
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="bg-gray-900/30 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/5 text-center w-full max-w-md"
//         >
//           <h2 className="text-2xl font-bold text-red-400">Invalid video URL</h2>
//           <p className="text-gray-400 mt-2">Please provide a valid URL.</p>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative p-6">
//       <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black -z-10" />
//       <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 -z-10" />
//       <div className="absolute inset-0 overflow-hidden -z-10">
//         <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
//         <div className="absolute top-1/3 -right-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
//       </div>

//       <Vortex className="absolute inset-0 -z-10" />

//       <motion.div
//         className="w-full max-w-4xl bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/5 flex flex-col items-center shadow-lg"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
//           🎥 AI Generated Video
//         </h2>

//         {/* Render Tavus Video in an iframe */}
//         {isTavusVideo ? (
//           <motion.div
//             className="w-full rounded-2xl overflow-hidden"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <iframe
//               src={videoUrl}
//               title="AI Generated Video"
//               allow="autoplay; encrypted-media"
//               allowFullScreen
//               className="w-full h-[500px] rounded-2xl"
//             />
//           </motion.div>
//         ) : (
//           // Render standard video if it's a direct media URL
//           <motion.div
//             className="w-full rounded-2xl p-px bg-gradient-to-r from-blue-500/30 to-purple-500/30"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <div className="rounded-2xl overflow-hidden">
//               <video controls autoPlay src={videoUrl} className="w-full rounded-2xl" />
//             </div>
//           </motion.div>
//         )}

//         <p className="text-gray-400 mt-6 text-sm">📅 Created At: {new Date().toLocaleString()}</p>

//         <div className="mt-8 flex space-x-6">
//           <Link href="/upload">
//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               className="px-6 py-3 rounded-2xl font-semibold text-green-400 bg-gray-900 border border-gray-800 hover:shadow-xl transition-all"
//             >
//               🎬 Generate More
//             </motion.button>
//           </Link>

//           <Link href="/">
//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               className="px-6 py-3 rounded-2xl font-semibold text-blue-400 bg-gray-900 border border-gray-800 hover:shadow-xl transition-all"
//             >
//               🏠 Home
//             </motion.button>
//           </Link>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default function VideoPage() {
//   return (
//     <Suspense
//       fallback={
//         <div className="min-h-screen flex items-center justify-center bg-black">
//           <div className="p-4 rounded-2xl bg-gray-900/40 shadow-lg">
//             <div className="text-blue-400 text-xl font-medium">Loading...</div>
//           </div>
//         </div>
//       }
//     >
//       <VideoContent />
//     </Suspense>
//   );
// }

"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Vortex } from "@/components/ui/vortex";

function VideoContent() {
  const searchParams = useSearchParams();
  const encodedUrl = searchParams.get("url");
 
  console.log(encodedUrl);

  let videoUrl = `/api/proxy?url=${encodeURIComponent(encodedUrl)}`;
  

  const isTavusVideo = videoUrl.includes("tavus.video");

  // Function to trigger video download
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = "AI_Generated_Video.mp4"; // File name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!videoUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black -z-10" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 -z-10" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/30 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/5 text-center w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-red-400">Invalid video URL</h2>
          <p className="text-gray-400 mt-2">Please provide a valid URL.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black -z-10" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 -z-10" />
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <Vortex className="absolute inset-0 -z-10" />

      {/* Video Card */}
      <motion.div
        className="w-full max-w-4xl bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/5 flex flex-col items-center shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
          🎥 AI Generated Video
        </h2>

        {/* Video Display (Tavus iframe or Direct Video) */}
        {isTavusVideo ? (
          <motion.div
            className="w-full rounded-2xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <iframe
              src={videoUrl}
              title="AI Generated Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-[500px] rounded-2xl"
            />
          </motion.div>
        ) : (
          <motion.div
            className="w-full rounded-2xl p-px bg-gradient-to-r from-blue-500/30 to-purple-500/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="rounded-2xl overflow-hidden">
              <video
                controls
                autoPlay
                src={videoUrl}
                crossOrigin="anonymous"
                preload="auto"
                className="w-full rounded-2xl"
                onError={(e) => console.error("Error loading video", e)}
              />
            </div>
          </motion.div>
        )}

        <p className="text-gray-400 mt-6 text-sm">📅 Created At: {new Date().toLocaleString()}</p>

        {/* Action Buttons */}
        <div className="mt-8 flex space-x-6">
          <Link href="/upload">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-2xl font-semibold text-green-400 bg-gray-900 border border-gray-800 hover:shadow-xl transition-all"
            >
              🎬 Generate More
            </motion.button>
          </Link>

          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-2xl font-semibold text-blue-400 bg-gray-900 border border-gray-800 hover:shadow-xl transition-all"
            >
              🏠 Home
            </motion.button>
          </Link>

          {/* Download Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="px-6 py-3 rounded-2xl font-semibold text-purple-400 bg-gradient-to-r from-purple-600 to-blue-500 hover:shadow-xl transition-all"
          >
            ⬇️ Download Video
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default function VideoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="p-4 rounded-2xl bg-gray-900/40 shadow-lg">
            <div className="text-blue-400 text-xl font-medium">Loading...</div>
          </div>
        </div>
      }
    >
      <VideoContent />
    </Suspense>
  );
}
