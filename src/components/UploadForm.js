// "use client";

// import { useState } from "react";
// import { useSession } from "next-auth/react";
// import { useNotification } from "./Notification";
// import { apiClient } from "@/lib/apiClient";
// import { BackgroundLines } from "./ui/background-lines"; // ✅ Import Background Lines
// import { motion } from "framer-motion";

// import Link from "next/link";

// const AI_MODELS = {
//   textToVideo: ["RunwayML", "Pictory", "Synthesia", "Lumen5", "DeepBrain"],
//   textToAudio: ["GoogleTTS", "IBMWatson", "AmazonPolly", "PlayHT", "CoquiTTS"],
// };

// const MAX_LIMITS = {
//   free: { duration: 10, promptLimit: 50 },
//   pro: { duration: 15, promptLimit: 100 },
//   "pro-plus": { duration: 20, promptLimit: 200 },
// };

// export default function UploadForm() {
//   const { data: session } = useSession();
//   const { showNotification } = useNotification();

//   const [type, setType] = useState("textToVideo"); // Default: Video
//   const [model, setModel] = useState(AI_MODELS.textToVideo[0]);
//   const [duration, setDuration] = useState(10);
//   const [resolution, setResolution] = useState("1080p");
//   const [voiceType, setVoiceType] = useState("male");
//   const [prompt, setPrompt] = useState("");
//   const [loading, setLoading] = useState(false);


//   if(!session || !session.user){
//     return (
//         <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center">
//           {/* 🔥 Animated Warning Icon */}
//           <motion.div
//             className="mb-6 text-red-500 text-6xl"
//             initial={{ scale: 0.5, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             🚫
//           </motion.div>
    
//           {/* 🔴 Animated Unauthorized Text */}
//           <motion.h1
//             className="text-4xl font-bold text-center mb-4"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             Unauthorized Access!
//           </motion.h1>
    
//           {/* ⚠️ Animated Subtext */}
//           <motion.p
//             className="text-lg text-gray-400 text-center mb-8"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//           >
//             Please log in to continue and access this page.
//           </motion.p>
    
//           {/* ✨ Animated Login Button */}
//           <Link href="/login">
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
//             >
//               Login Now
//             </motion.button>
//           </Link>
//         </div>
//       );
//   }

//   const userPlan = session?.user?.subscription?.plan || "free";
//   const { duration: maxDuration, promptLimit } = MAX_LIMITS[userPlan];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (prompt.length > promptLimit) {
//       showNotification(`Prompt exceeds ${promptLimit} characters.`, "error");
//       setLoading(false);
//       return;
//     }

//     const payload = {
//       model,
//       duration,
//       prompt,
//       ...(type === "textToVideo" ? { resolution } : { voiceType }),
//     };

//     const endpoint = type === "textToVideo" ? "/user/generate/video" : "/user/generate/audio";

//     try {
//       const response = await apiClient.fetch(endpoint, {
//         method: "POST",
//         body: payload,
//       });

//       if (response.videoUrl || response.audioUrl) {
//         // Encode the URL to ensure it works in query params
//         const mediaUrl = encodeURIComponent(response.videoUrl || response.audioUrl);
//         router.push(`/${type === "textToVideo" ? "video" : "audio"}?url=${mediaUrl}`);
//       } else {
//         throw new Error("Failed to generate media.");
//       }
      
//     } catch (error) {
//       showNotification(error.message || "Failed to generate media", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen bg-black text-white flex items-center justify-center">
//       {/* ✅ Background Lines */}
//       <BackgroundLines className="absolute inset-0" />

//       {/* ✅ Main Content - Split into Two Sections */}
//       <div className="relative w-full max-w-5xl flex bg-transparent bg-opacity-80 p-8 rounded-lg shadow-lg">
//         {/* ✅ Left Side - Form */}
//         <div className="w-1/2 pr-6">
//           <h2 className="text-2xl font-bold text-center mb-6">
//             {type === "textToVideo" ? "Generate Video" : "Generate Audio"}
//           </h2>

//           {/* ✅ Type Selection */}
//           <div className="flex justify-center mb-4">
//             <button
//               className={`px-4 py-2 rounded-l ${
//                 type === "textToVideo" ? "bg-green-500" : "bg-gray-700"
//               }`}
//               onClick={() => setType("textToVideo")}
//             >
//               🎥 Video
//             </button>
//             <button
//               className={`px-4 py-2 rounded-r ${
//                 type === "textToAudio" ? "bg-blue-500" : "bg-gray-700"
//               }`}
//               onClick={() => setType("textToAudio")}
//             >
//               🎙️ Audio
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* ✅ AI Model Selection */}
//             <div>
//               <label className="block font-semibold">Select AI Model</label>
//               <select
//                 value={model}
//                 onChange={(e) => setModel(e.target.value)}
//                 className="w-full p-2 border rounded bg-black text-gray-200"
//               >
//                 {AI_MODELS[type].map((aiModel) => (
//                   <option key={aiModel} value={aiModel}>
//                     {aiModel}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* ✅ Duration (Limited by Plan) */}
//             <div>
//               <label className="block font-semibold">
//                 Duration (Max: {maxDuration} sec)
//               </label>
//               <input
//                 type="number"
//                 value={duration}
//                 onChange={(e) => setDuration(Math.min(maxDuration, e.target.value))}
//                 className="w-full p-2 border rounded bg-black text-gray-200"
//                 max={maxDuration}
//               />
//             </div>

//             {/* ✅ Resolution (Only for Video) */}
//             {type === "textToVideo" && (
//               <div>
//                 <label className="block font-semibold">Select Resolution</label>
//                 <select
//                   value={resolution}
//                   onChange={(e) => setResolution(e.target.value)}
//                   className="w-full p-2 border rounded bg-black text-gray-200"
//                 >
//                   <option value="720p">720p</option>
//                   <option value="1080p">1080p</option>
//                   <option value="4K">4K</option>
//                 </select>
//               </div>
//             )}

//             {/* ✅ Voice Type (Only for Audio) */}
//             {type === "textToAudio" && (
//               <div>
//                 <label className="block font-semibold">Voice Type</label>
//                 <select
//                   value={voiceType}
//                   onChange={(e) => setVoiceType(e.target.value)}
//                   className="w-full p-2 border rounded bg-black text-gray-200"
//                 >
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="custom">Custom</option>
//                 </select>
//               </div>
//             )}

//             {/* ✅ Text Prompt (Limited by Plan) */}
//             <div>
//               <label className="block font-semibold">
//                 Enter Prompt (Max: {promptLimit} chars)
//               </label>
//               <textarea
//                 value={prompt}
//                 onChange={(e) => setPrompt(e.target.value)}
//                 className="w-full p-2 border rounded bg-black text-gray-200 resize-none"
//                 maxLength={promptLimit}
//                 rows={3}
//                 placeholder="Describe what you want to generate..."
//               ></textarea>
//             </div>

//             {/* ✅ Submit Button */}
//             <button
//               type="submit"
//               className={`w-full ${
//                 type === "textToVideo"
//                   ? "bg-green-500 hover:bg-green-600"
//                   : "bg-blue-500 hover:bg-blue-600"
//               } text-white py-2 rounded flex items-center justify-center`}
//               disabled={loading}
//             >
//               {loading ? (
//                 <motion.div
//                   className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                 />
//               ) : (
//                 `Generate ${type === "textToVideo" ? "Video" : "Audio"}`
//               )}
//             </button>
//           </form>
//         </div>
        

//         {/* ✅ Right Side - Video Preview */}
//         <div className="w-1/2 flex justify-center items-center">
//           <div className="w-full h-full border border-gray-700 rounded-lg overflow-hidden">
//             <video
//               src="/upload-video.mp4"
//               autoPlay
//               loop
//               muted
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }










  // "use client";

  // import { useState } from "react";
  // import { useSession } from "next-auth/react";
  // import { useNotification } from "./Notification";
  // import { apiClient } from "@/lib/apiClient";
  // import Link from "next/link";
  // import { motion } from "framer-motion";
  // import { useRouter } from "next/navigation"; 
  // // import VideoPopup from "./VideoPopup";


  // // Video Popup Component
  // function VideoPopup({ videoId, onClose }) {
  //   return (
  //     <motion.div
  //       initial={{ opacity: 0, y: 50 }}
  //       animate={{ opacity: 1, y: 0 }}
  //       exit={{ opacity: 0, y: 50 }}
  //       className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4"
  //     >
  //       <div className="bg-gray-900 text-white rounded-2xl p-8 max-w-lg shadow-2xl">
  //         <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent text-center mb-4">
  //           🎬 Video Generation Started!
  //         </h2>
  
  //         <p className="text-lg text-gray-300 mb-6 text-center">
  //           Your video is being processed. You can track its progress on the{" "}
  //           <Link href="/my-videos" className="text-cyan-400 underline">
  //             My Videos
  //           </Link>{" "}
  //           page.
  //         </p>
  
  //         <div className="flex justify-center gap-4">
  //           <button
  //             onClick={onClose}
  //             className="px-6 py-3 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
  //           >
  //             Close
  //           </button>
  
  //           <Link href="/my-videos">
  //             <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition">
  //               📺 Go to My Videos
  //             </button>
  //           </Link>
  //         </div>
  //       </div>
  //     </motion.div>
  //   );
  // }

  // const AI_MODELS = {
  //   textToVideo: ["Tavus", "RunwayML", "Pictory", "Synthesia", "Lumen5", "DeepBrain"],
  //   textToAudio: ["GoogleTTS", "IBMWatson", "AmazonPolly", "PlayHT", "CoquiTTS"],
  // };

  // const MAX_LIMITS = {
  //   free: { duration: 10, promptLimit: 150 },
  //   pro: { duration: 15, promptLimit: 200 },
  //   "pro-plus": { duration: 20, promptLimit: 500 },
  // };

  // export default function UploadForm() {
  //   const router = useRouter();
  //   const { data: session } = useSession();
  //   const { showNotification } = useNotification();

  //   const [type, setType] = useState("textToVideo"); // Default: Video
  //   const [model, setModel] = useState(AI_MODELS.textToVideo[0]);
  //   const [duration, setDuration] = useState(10);
  //   const [resolution, setResolution] = useState("1080p");
  //   const [voiceType, setVoiceType] = useState("male");
  //   const [prompt, setPrompt] = useState("");
  //   const [loading, setLoading] = useState(false);
  //   const [showPopup, setShowPopup] = useState(false);
  //   const [popupData, setPopupData] = useState(null);

    

  //   if(!session || !session.user){
  //     return (
  //       <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center p-4">
  //         <div className="w-full max-w-md p-8 rounded-2xl bg-gray-800 shadow-[5px_5px_15px_rgba(0,0,0,0.4),-5px_-5px_15px_rgba(70,70,70,0.1)]">
  //           <motion.div
  //             className="mb-6 text-red-500 text-6xl text-center"
  //             initial={{ scale: 0.5, opacity: 0 }}
  //             animate={{ scale: 1, opacity: 1 }}
  //             transition={{ duration: 0.5 }}
  //           >
  //             🚫
  //           </motion.div>
      
  //           <motion.h1
  //             className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-600"
  //             initial={{ opacity: 0, y: -10 }}
  //             animate={{ opacity: 1, y: 0 }}
  //             transition={{ duration: 0.8 }}
  //           >
  //             Unauthorized Access!
  //           </motion.h1>
      
  //           <motion.p
  //             className="text-lg text-gray-400 text-center mb-8"
  //             initial={{ opacity: 0 }}
  //             animate={{ opacity: 1 }}
  //             transition={{ delay: 0.3, duration: 0.8 }}
  //           >
  //             Please log in to continue and access this page.
  //           </motion.p>
      
  //           <Link href="/login">
  //             <motion.button
  //               whileHover={{ scale: 1.03 }}
  //               whileTap={{ scale: 0.97 }}
  //               className="w-full py-3 rounded-xl text-white font-medium bg-gray-800 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.7),inset_-2px_-2px_5px_rgba(70,70,70,0.2)] hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.8),inset_-4px_-4px_8px_rgba(70,70,70,0.2)] transition-all duration-300 border-t border-l border-gray-700"
  //             >
  //               <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Login Now</span>
  //             </motion.button>
  //           </Link>
  //         </div>
  //       </div>
  //     );
  //   }

  //   const userPlan = session?.user?.subscription?.plan || "free";
  //   const { duration: maxDuration, promptLimit } = MAX_LIMITS[userPlan];

  //   // const handleSubmit = async (e) => {
  //   //   e.preventDefault();
  //   //   setLoading(true);

  //   //   if (prompt.length > promptLimit) {
  //   //     showNotification(`Prompt exceeds ${promptLimit} characters.`, "error");
  //   //     setLoading(false);
  //   //     return;
  //   //   }

  //   //   const payload = {
  //   //     model,
  //   //     duration,
  //   //     prompt,
  //   //     type ,
  //   //     ...(type === "textToVideo" ? { resolution } : { voiceType }),
  //   //   };

  //   //   const endpoint = type === "textToVideo" ? "/user/generate/video" : "/user/generate/audio";

  //   //   try {
  //   //     const response = await apiClient.fetch(endpoint, {
  //   //       method: "POST",
  //   //       body: payload,
  //   //     });

  //   //     if (response.videoUrl || response.audioUrl) {
  //   //       // Encode the URL to ensure it works in query params
  //   //       const mediaUrl = encodeURIComponent(response.videoUrl || response.audioUrl);
  //   //       router.push(`/${type === "textToVideo" ? "video" : "audio"}?url=${mediaUrl}`);
  //   //     } else {
  //   //       throw new Error("Failed to generate media.");
  //   //     }
        
  //   //   } catch (error) {
  //   //     showNotification(error.message || "Failed to generate media", "error");
  //   //   } finally {
  //   //     setLoading(false);
  //   //   }
  //   // };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setLoading(true);
  
  //     if (prompt.length > promptLimit) {
  //       showNotification(`Prompt exceeds ${promptLimit} characters.`, "error");
  //       setLoading(false);
  //       return;
  //     }
  
  //     const payload = {
  //       model,
  //       duration,
  //       prompt,
  //       type,
  //       ...(type === "textToVideo" ? { resolution } : { voiceType }),
  //     };
  
  //     const endpoint = type === "textToVideo" ? "/user/generate/video" : "/user/generate/audio";
  
  //     try {
  //       const response = await apiClient.fetch(endpoint, {
  //         method: "POST",
  //         body: payload,
  //       });
  
  //       if (response.status === "queued" && response.video_id) {
  //         setPopupData({ videoId: response.video_id });
  //         setShowPopup(true);
  //       } else {
  //         throw new Error("Failed to start video generation.");
  //       }
  //     } catch (error) {
  //       showNotification(error.message || "Failed to generate media", "error");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
    

  //   const neuroBtnStyle = "px-4 py-2 font-medium transition-all duration-300";
  //   const activeNeuroBtn = "text-white bg-gray-800 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.7),inset_-2px_-2px_5px_rgba(70,70,70,0.2)]";
  //   const inactiveNeuroBtn = "text-gray-400 bg-gray-800 shadow-[2px_2px_5px_rgba(0,0,0,0.5),-2px_-2px_5px_rgba(70,70,70,0.15)]";
    
  //   const neuroFormControl = "w-full p-3 rounded-xl bg-gray-800 text-gray-200 border-t border-l border-gray-700 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5),inset_-2px_-2px_5px_rgba(70,70,70,0.15)] focus:outline-none focus:shadow-[inset_3px_3px_7px_rgba(0,0,0,0.6),inset_-3px_-3px_7px_rgba(70,70,70,0.2)]";

  //   return (
  //     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center p-4">
  //       <div className="w-full max-w-6xl rounded-2xl bg-gray-800 shadow-[10px_10px_30px_rgba(0,0,0,0.5),-10px_-10px_30px_rgba(70,70,70,0.1)] p-8">
  //         <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
  //           AI Media Creator
  //         </h1>

  //         <div className="flex flex-col lg:flex-row gap-8">
  //           {/* Left Side - Form */}
  //           <div className="w-full lg:w-1/2">
  //             <div className="rounded-xl bg-gray-800 shadow-[inset_3px_3px_7px_rgba(0,0,0,0.6),inset_-3px_-3px_7px_rgba(70,70,70,0.15)] p-6">
  //               <h2 className="text-xl font-bold text-center mb-6">
  //                 {type === "textToVideo" ? "Generate Video" : "Generate Audio"}
  //               </h2>

  //               {/* Type Selection */}
  //               <div className="flex justify-center mb-6">
  //                 <div className="rounded-xl overflow-hidden bg-black p-1 shadow-[4px_4px_10px_rgba(0,0,0,0.5),-4px_-4px_10px_rgba(70,70,70,0.15)]">
  //                   <button
  //                     className={`${neuroBtnStyle} rounded-l-lg ${
  //                       type === "textToVideo" ? activeNeuroBtn : inactiveNeuroBtn
  //                     }`}
  //                     onClick={() => setType("textToVideo")}
  //                   >
  //                     <span className={type === "textToVideo" ? "bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-500" : ""}>
  //                       🎥 Video
  //                     </span>
  //                   </button>
  //                   <button
  //                     className={`${neuroBtnStyle} rounded-r-lg ${
  //                       type === "textToAudio" ? activeNeuroBtn : inactiveNeuroBtn
  //                     }`}
  //                     onClick={() => setType("textToAudio")}
  //                   >
  //                     <span className={type === "textToAudio" ? "bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600" : ""}>
  //                       🎙️ Audio
  //                     </span>
  //                   </button>
  //                 </div>
  //               </div>

  //               <form onSubmit={handleSubmit} className="space-y-6">
  //                 {/* AI Model Selection */}
  //                 <div>
  //                   <label className="block font-semibold mb-2 text-gray-300">AI Model</label>
  //                   <select
  //                     value={model}
  //                     onChange={(e) => setModel(e.target.value)}
  //                     className={neuroFormControl}
  //                   >
  //                     {AI_MODELS[type].map((aiModel) => (
  //                       <option key={aiModel} value={aiModel} className="bg-gray-900">
  //                         {aiModel}
  //                       </option>
  //                     ))}
  //                   </select>
  //                 </div>

  //                 {/* Duration (Limited by Plan) */}
  //                 <div>
  //                   <div className="flex justify-between mb-2">
  //                     <label className="font-semibold text-gray-300">Duration</label>
  //                     <span className="text-sm text-gray-400">Max: {maxDuration} sec</span>
  //                   </div>
  //                   <input
  //                     type="range"
  //                     value={duration}
  //                     onChange={(e) => setDuration(Math.min(maxDuration, parseInt(e.target.value)))}
  //                     className="w-full accent-purple-500 h-2 rounded-lg cursor-pointer"
  //                     min="1"
  //                     max={maxDuration}
  //                   />
  //                   <div className="text-center mt-1 text-purple-400 font-medium">{duration} sec</div>
  //                 </div>

  //                 {/* Resolution (Only for Video) */}
  //                 {type === "textToVideo" && (
  //                   <div>
  //                     <label className="block font-semibold mb-2 text-gray-300">Resolution</label>
  //                     <div className="flex gap-2">
  //                       {["720p", "1080p", "4K"].map((res) => (
  //                         <button
  //                           key={res}
  //                           type="button"
  //                           className={`flex-1 py-2 rounded-lg ${
  //                             resolution === res
  //                               ? "bg-gray-800 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.7),inset_-2px_-2px_5px_rgba(70,70,70,0.2)] text-cyan-400"
  //                               : "bg-gray-800 shadow-[2px_2px_5px_rgba(0,0,0,0.5),-2px_-2px_5px_rgba(70,70,70,0.15)] text-gray-400"
  //                           } transition-all duration-300`}
  //                           onClick={() => setResolution(res)}
  //                         >
  //                           {res}
  //                         </button>
  //                       ))}
  //                     </div>
  //                   </div>
  //                 )}

  //                 {/* Voice Type (Only for Audio) */}
  //                 {type === "textToAudio" && (
  //                   <div>
  //                     <label className="block font-semibold mb-2 text-gray-300">Voice Type</label>
  //                     <div className="flex gap-2">
  //                       {["male", "female", "custom"].map((voice) => (
  //                         <button
  //                           key={voice}
  //                           type="button"
  //                           className={`flex-1 py-2 rounded-lg capitalize ${
  //                             voiceType === voice
  //                               ? "bg-gray-800 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.7),inset_-2px_-2px_5px_rgba(70,70,70,0.2)] text-blue-400"
  //                               : "bg-gray-800 shadow-[2px_2px_5px_rgba(0,0,0,0.5),-2px_-2px_5px_rgba(70,70,70,0.15)] text-gray-400"
  //                           } transition-all duration-300`}
  //                           onClick={() => setVoiceType(voice)}
  //                         >
  //                           {voice}
  //                         </button>
  //                       ))}
  //                     </div>
  //                   </div>
  //                 )}

  //                 {/* Text Prompt (Limited by Plan) */}
  //                 <div>
  //                   <div className="flex justify-between mb-2">
  //                     <label className="font-semibold text-gray-300">Prompt</label>
  //                     <span className="text-sm text-gray-400">{prompt.length}/{200} chars</span>
  //                   </div>
  //                   <textarea
  //                     value={prompt}
  //                     onChange={(e) => setPrompt(e.target.value)}
  //                     className={`${neuroFormControl} resize-none h-24`}
  //                     maxLength={200}
  //                     placeholder="Describe what you want to generate..."
  //                   ></textarea>
  //                 </div>

  //                 {/* Submit Button */}
  //                 <motion.button
  //   type="submit"
  //   whileHover={{ scale: 1.02 }}
  //   whileTap={{ scale: 0.98 }}
  //   className={`w-full py-3 rounded-xl font-bold ${
  //     type === "textToVideo"
  //       ? "bg-gray-800 shadow-[4px_4px_10px_rgba(0,0,0,0.5),-4px_-4px_10px_rgba(70,70,70,0.15)] hover:shadow-[2px_2px_5px_rgba(0,0,0,0.5),-2px_-2px_5px_rgba(70,70,70,0.15)]"
  //       : "bg-gray-800 shadow-[4px_4px_10px_rgba(0,0,0,0.5),-4px_-4px_10px_rgba(70,70,70,0.15)] hover:shadow-[2px_2px_5px_rgba(0,0,0,0.5),-2px_-2px_5px_rgba(70,70,70,0.15)]"
  //   } transition-all duration-300 border-t border-l border-gray-700 flex items-center justify-center`}
  //   disabled={loading}
  // >
  //   {loading ? (
  //     <div className="flex items-center gap-3">
  //       <motion.div
  //         className="h-5 w-5 border-3 border-white border-t-transparent rounded-full"
  //         animate={{ rotate: 360 }}
  //         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  //       />
  //       <span className="text-gray-400">Waiting for video to be ready...</span>
  //     </div>
  //   ) : (
  //     <span
  //       className={`bg-clip-text text-transparent ${
  //         type === "textToVideo"
  //           ? "bg-gradient-to-r from-cyan-400 to-emerald-500"
  //           : "bg-gradient-to-r from-blue-400 to-purple-600"
  //       }`}
  //     >
  //       Generate {type === "textToVideo" ? "Video" : "Audio"}
  //     </span>
  //   )}
  // </motion.button>

  //               </form>
  //             </div>
  //             {showPopup && popupData && (
  //       <VideoPopup videoId={popupData.videoId} onClose={() => setShowPopup(false)} />
  //     )}
  //           </div>

  //           {/* Right Side - Preview */}
  //           <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
  //             <div className="w-full h-full rounded-2xl overflow-hidden shadow-[10px_10px_20px_rgba(0,0,0,0.5),-10px_-10px_20px_rgba(70,70,70,0.1)] border-t border-l border-gray-700 transition-all duration-300">
  //               <div className="bg-black rounded-t-2xl flex items-center py-2 px-4">
  //                 <div className="flex gap-2">
  //                   <div className="w-3 h-3 bg-red-500 rounded-full"></div>
  //                   <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
  //                   <div className="w-3 h-3 bg-green-500 rounded-full"></div>
  //                 </div>
  //                 <div className="text-gray-400 text-xs mx-auto">
  //                   {type === "textToVideo" ? "Video Preview" : "Audio Preview"}
  //                 </div>
  //               </div>
                
  //               <div className="bg-gradient-to-br from-gray-900 to-black p-1">
  //                 <video
  //                   src="/upload-video.mp4"
  //                   autoPlay
  //                   loop
  //                   muted
  //                   className="w-full h-64 lg:h-80 object-cover rounded-lg"
  //                 />
  //               </div>
                
  //               <div className="p-4 bg-gray-900">
  //                 <div className="flex justify-between items-center">
  //                   <div className="text-sm text-cyan-400">
  //                     {type === "textToVideo" ? resolution : `${voiceType} Voice`}
  //                   </div>
  //                   <div className="text-sm text-purple-400">
  //                     {duration}s
  //                   </div>
  //                 </div>
  //                 <div className="mt-3 w-full bg-gray-800 h-1 rounded-full overflow-hidden shadow-[inset_1px_1px_3px_rgba(0,0,0,0.7)]">
  //                   <div className={`h-full rounded-full ${type === "textToVideo" ? "bg-gradient-to-r from-cyan-400 to-emerald-500" : "bg-gradient-to-r from-blue-400 to-purple-600"}`} style={{width: "60%"}}></div>
  //                 </div>
  //               </div>
  //             </div>
              
  //             <div className="mt-4 text-center">
  //               <span className="text-xs text-gray-500">Using </span>
  //               <span className="text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
  //                 {userPlan === "free" ? "FREE" : userPlan === "pro" ? "PRO" : "PRO+"} Plan
  //               </span>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }


  "use client";

import { useState ,useEffect } from "react";
import { useSession } from "next-auth/react";
import { useNotification } from "./Notification";
import { apiClient } from "@/lib/apiClient";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation"; 
import VideoPopup from "./VideoPopup";

// Video Popup Component
// function VideoPopup({ videoId, onClose }) {
//   const [progress, setProgress] = useState(0);
  
//   // Simulate processing progress
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress(prev => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           return 100;
//         }
//         return prev + 1;
//       });
//     }, 300);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black bg-opacity-30">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ type: "spring", damping: 15 }}
//         className="w-full max-w-md rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-1"
//       >
//         <div className="rounded-3xl bg-white dark:bg-gray-900 p-8 shadow-inner relative overflow-hidden">
//           {/* Decorative elements */}
//           <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-purple-500 opacity-10 blur-2xl"></div>
//           <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-blue-500 opacity-10 blur-2xl"></div>
          
//           {/* Neuromorphic card header */}
//           <div className="flex justify-center mb-6">
//             <motion.div 
//               initial={{ y: -10 }}
//               animate={{ y: 0 }}
//               transition={{ yoyo: Infinity, duration: 2 }}
//               className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center shadow-lg"
//             >
//               <span className="text-4xl">🎬</span>
//             </motion.div>
//           </div>
          
//           <motion.h2 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="text-center text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-4"
//           >
//             Video Generation Started!
//           </motion.h2>
          
//           {/* Progress bar - neuromorphic style */}
//           <div className="relative h-4 rounded-full bg-gray-200 dark:bg-gray-700 shadow-inner mb-6 mt-8">
//             <motion.div 
//               initial={{ width: "0%" }}
//               animate={{ width: `${progress}%` }}
//               className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
//             ></motion.div>
//             <div className="absolute w-full text-center text-xs text-gray-600 dark:text-gray-400 -bottom-6">
//               {progress}% Complete
//             </div>
//           </div>
          
//           <p className="text-center text-gray-600 dark:text-gray-300 my-8">
//             Your video is being processed. You can track its progress on the{" "}
//             <Link href="/my-videos" className="font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400">
//               My Videos
//             </Link>{" "}
//             page.
//           </p>
          
//           {/* Neuromorphic buttons */}
//           <div className="flex justify-center gap-4 mt-6">
//             <button
//               onClick={onClose}
//               className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-lg hover:shadow-sm transition-all duration-300 font-medium"
//             >
//               Close
//             </button>
            
//             <Link href="/my-videos">
//               <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-medium">
//                 <div className="flex items-center gap-2">
//                   <span>📺</span>
//                   <span>Go to My Videos</span>
//                 </div>
//               </button>
//             </Link>
//           </div>
          
//           {/* Video ID display */}
//           <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
//             Video ID: {videoId || "N/A"}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

const AI_MODELS = {
  textToVideo: ["Tavus", "RunwayML", "Pictory", "Synthesia", "Lumen5", "DeepBrain"],
  textToAudio: ["GoogleTTS", "IBMWatson", "AmazonPolly", "PlayHT", "CoquiTTS"],
};

const MAX_LIMITS = {
  free: { duration: 10, promptLimit: 150 },
  pro: { duration: 15, promptLimit: 200 },
  "pro-plus": { duration: 20, promptLimit: 500 },
};

export default function UploadForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const [type, setType] = useState("textToVideo"); // Default: Video
  const [model, setModel] = useState(AI_MODELS.textToVideo[0]);
  const [duration, setDuration] = useState(10);
  const [resolution, setResolution] = useState("1080p");
  const [voiceType, setVoiceType] = useState("male");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [videoId, setVideoId] = useState(null);

  if(!session || !session.user){
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-2xl bg-gray-800 shadow-[5px_5px_15px_rgba(0,0,0,0.4),-5px_-5px_15px_rgba(70,70,70,0.1)]">
          <motion.div
            className="mb-6 text-red-500 text-6xl text-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            🚫
          </motion.div>
    
          <motion.h1
            className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-600"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Unauthorized Access!
          </motion.h1>
    
          <motion.p
            className="text-lg text-gray-400 text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Please log in to continue and access this page.
          </motion.p>
    
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 rounded-xl text-white font-medium bg-gray-800 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.7),inset_-2px_-2px_5px_rgba(70,70,70,0.2)] hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.8),inset_-4px_-4px_8px_rgba(70,70,70,0.2)] transition-all duration-300 border-t border-l border-gray-700"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Login Now</span>
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  const userPlan = session?.user?.subscription?.plan || "free";
  const { duration: maxDuration, promptLimit } = MAX_LIMITS[userPlan];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (prompt.length > promptLimit) {
      showNotification(`Prompt exceeds ${promptLimit} characters.`, "error");
      setLoading(false);
      return;
    }

    const payload = {
      model,
      duration,
      prompt,
      type,
      ...(type === "textToVideo" ? { resolution } : { voiceType }),
    };

    const endpoint = type === "textToVideo" ? "/user/generate/video" : "/user/generate/audio";

    try {
      const response = await apiClient.fetch(endpoint, {
        method: "POST",
        body: payload,
      });
      console.log(response);

      if (response.status === "queued" && response.videoId) {
        setVideoId(response.videoId);
        setShowPopup(true);
      } else {
        throw new Error("Failed to start video generation.");
      }
    } catch (error) {
      showNotification(error.message || "Failed to generate media", "error");
    } finally {
      setLoading(false);
    }
  };
  
  const closePopup = () => {
    setShowPopup(false);
  };

  const neuroBtnStyle = "px-4 py-2 font-medium transition-all duration-300";
  const activeNeuroBtn = "text-white bg-gray-800 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.7),inset_-2px_-2px_5px_rgba(70,70,70,0.2)]";
  const inactiveNeuroBtn = "text-gray-400 bg-gray-800 shadow-[2px_2px_5px_rgba(0,0,0,0.5),-2px_-2px_5px_rgba(70,70,70,0.15)]";
  
  const neuroFormControl = "w-full p-3 rounded-xl bg-gray-800 text-gray-200 border-t border-l border-gray-700 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5),inset_-2px_-2px_5px_rgba(70,70,70,0.15)] focus:outline-none focus:shadow-[inset_3px_3px_7px_rgba(0,0,0,0.6),inset_-3px_-3px_7px_rgba(70,70,70,0.2)]";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl rounded-2xl bg-gray-800 shadow-[10px_10px_30px_rgba(0,0,0,0.5),-10px_-10px_30px_rgba(70,70,70,0.1)] p-8">
        <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
          AI Media Creator
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Form */}
          <div className="w-full lg:w-1/2">
            <div className="rounded-xl bg-gray-800 shadow-[inset_3px_3px_7px_rgba(0,0,0,0.6),inset_-3px_-3px_7px_rgba(70,70,70,0.15)] p-6">
              <h2 className="text-xl font-bold text-center mb-6">
                {type === "textToVideo" ? "Generate Video" : "Generate Audio"}
              </h2>

              {/* Type Selection */}
              <div className="flex justify-center mb-6">
                <div className="rounded-xl overflow-hidden bg-black p-1 shadow-[4px_4px_10px_rgba(0,0,0,0.5),-4px_-4px_10px_rgba(70,70,70,0.15)]">
                  <button
                    className={`${neuroBtnStyle} rounded-l-lg ${
                      type === "textToVideo" ? activeNeuroBtn : inactiveNeuroBtn
                    }`}
                    onClick={() => setType("textToVideo")}
                  >
                    <span className={type === "textToVideo" ? "bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-500" : ""}>
                      🎥 Video
                    </span>
                  </button>
                  <button
                    className={`${neuroBtnStyle} rounded-r-lg ${
                      type === "textToAudio" ? activeNeuroBtn : inactiveNeuroBtn
                    }`}
                    onClick={() => setType("textToAudio")}
                  >
                    <span className={type === "textToAudio" ? "bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600" : ""}>
                      🎙️ Audio
                    </span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* AI Model Selection */}
                <div>
                  <label className="block font-semibold mb-2 text-gray-300">AI Model</label>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className={neuroFormControl}
                  >
                    {AI_MODELS[type].map((aiModel) => (
                      <option key={aiModel} value={aiModel} className="bg-gray-900">
                        {aiModel}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Duration (Limited by Plan) */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-semibold text-gray-300">Duration</label>
                    <span className="text-sm text-gray-400">Max: {maxDuration} sec</span>
                  </div>
                  <input
                    type="range"
                    value={duration}
                    onChange={(e) => setDuration(Math.min(maxDuration, parseInt(e.target.value)))}
                    className="w-full accent-purple-500 h-2 rounded-lg cursor-pointer"
                    min="1"
                    max={maxDuration}
                  />
                  <div className="text-center mt-1 text-purple-400 font-medium">{duration} sec</div>
                </div>

                {/* Resolution (Only for Video) */}
                {type === "textToVideo" && (
                  <div>
                    <label className="block font-semibold mb-2 text-gray-300">Resolution</label>
                    <div className="flex gap-2">
                      {["720p", "1080p", "4K"].map((res) => (
                        <button
                          key={res}
                          type="button"
                          className={`flex-1 py-2 rounded-lg ${
                            resolution === res
                              ? "bg-gray-800 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.7),inset_-2px_-2px_5px_rgba(70,70,70,0.2)] text-cyan-400"
                              : "bg-gray-800 shadow-[2px_2px_5px_rgba(0,0,0,0.5),-2px_-2px_5px_rgba(70,70,70,0.15)] text-gray-400"
                          } transition-all duration-300`}
                          onClick={() => setResolution(res)}
                        >
                          {res}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Voice Type (Only for Audio) */}
                {type === "textToAudio" && (
                  <div>
                    <label className="block font-semibold mb-2 text-gray-300">Voice Type</label>
                    <div className="flex gap-2">
                      {["male", "female", "custom"].map((voice) => (
                        <button
                          key={voice}
                          type="button"
                          className={`flex-1 py-2 rounded-lg capitalize ${
                            voiceType === voice
                              ? "bg-gray-800 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.7),inset_-2px_-2px_5px_rgba(70,70,70,0.2)] text-blue-400"
                              : "bg-gray-800 shadow-[2px_2px_5px_rgba(0,0,0,0.5),-2px_-2px_5px_rgba(70,70,70,0.15)] text-gray-400"
                          } transition-all duration-300`}
                          onClick={() => setVoiceType(voice)}
                        >
                          {voice}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Text Prompt (Limited by Plan) */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-semibold text-gray-300">Prompt</label>
                    <span className="text-sm text-gray-400">{prompt.length}/{promptLimit} chars</span>
                  </div>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className={`${neuroFormControl} resize-none h-24`}
                    maxLength={promptLimit}
                    placeholder="Describe what you want to generate..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-xl font-bold ${
                    type === "textToVideo"
                      ? "bg-gray-800 shadow-[4px_4px_10px_rgba(0,0,0,0.5),-4px_-4px_10px_rgba(70,70,70,0.15)] hover:shadow-[2px_2px_5px_rgba(0,0,0,0.5),-2px_-2px_5px_rgba(70,70,70,0.15)]"
                      : "bg-gray-800 shadow-[4px_4px_10px_rgba(0,0,0,0.5),-4px_-4px_10px_rgba(70,70,70,0.15)] hover:shadow-[2px_2px_5px_rgba(0,0,0,0.5),-2px_-2px_5px_rgba(70,70,70,0.15)]"
                  } transition-all duration-300 border-t border-l border-gray-700 flex items-center justify-center`}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="h-5 w-5 border-3 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="text-gray-400">Waiting for video to be ready...</span>
                    </div>
                  ) : (
                    <span
                      className={`bg-clip-text text-transparent ${
                        type === "textToVideo"
                          ? "bg-gradient-to-r from-cyan-400 to-emerald-500"
                          : "bg-gradient-to-r from-blue-400 to-purple-600"
                      }`}
                    >
                      Generate {type === "textToVideo" ? "Video" : "Audio"}
                    </span>
                  )}
                </motion.button>
              </form>
            </div>
          </div>

          {/* Right Side - Preview */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-[10px_10px_20px_rgba(0,0,0,0.5),-10px_-10px_20px_rgba(70,70,70,0.1)] border-t border-l border-gray-700 transition-all duration-300">
              <div className="bg-black rounded-t-2xl flex items-center py-2 px-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-gray-400 text-xs mx-auto">
                  {type === "textToVideo" ? "Video Preview" : "Audio Preview"}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 to-black p-1">
                <video
                  src="/upload-video.mp4"
                  autoPlay
                  loop
                  muted
                  className="w-full h-64 lg:h-80 object-cover rounded-lg"
                />
              </div>
              
              <div className="p-4 bg-gray-900">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-cyan-400">
                    {type === "textToVideo" ? resolution : `${voiceType} Voice`}
                  </div>
                  <div className="text-sm text-purple-400">
                    {duration}s
                  </div>
                </div>
                <div className="mt-3 w-full bg-gray-800 h-1 rounded-full overflow-hidden shadow-[inset_1px_1px_3px_rgba(0,0,0,0.7)]">
                  <div className={`h-full rounded-full ${type === "textToVideo" ? "bg-gradient-to-r from-cyan-400 to-emerald-500" : "bg-gradient-to-r from-blue-400 to-purple-600"}`} style={{width: "60%"}}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <span className="text-xs text-gray-500">Using </span>
              <span className="text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {userPlan === "free" ? "FREE" : userPlan === "pro" ? "PRO" : "PRO+"} Plan
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Popup Component */}
      <AnimatePresence>
        {showPopup && (
          <VideoPopup videoId={videoId} onClose={closePopup} />
        )}
      </AnimatePresence>
    </div>
  );
}