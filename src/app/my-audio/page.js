// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { Music, Timer, Mic, PlusCircle } from "lucide-react";
// import { Vortex } from "@/components/ui/vortex";

// export default function MyAudio() {
//   const [audios, setAudios] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchAudios = async () => {
//       try {
//         const res = await fetch("/api/user/my-audio");
//         const data = await res.json();
//         if (data.success) {
//           setAudios(data.audios);
//         }
//       } catch (error) {
//         console.error("Error fetching audios:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAudios();
//   }, []);

//   if (loading)
//     return <p className="text-center text-white text-2xl">Loading audios...</p>;

//   return (
//     <div className="relative min-h-screen flex flex-col items-center bg-transparent bg-opacity-90 p-10">
      
//       {/* Vortex Background */}
//       <div className="absolute inset-0 flex items-center justify-center -z-10">
//         <Vortex />
//       </div>

//       {/* Page Title - Placed at the Top */}
//       <h2 className="text-white text-4xl font-bold text-center mt-10 mb-8 relative z-10">
//         🎵 My Audio Files
//       </h2>

//       {audios.length === 0 ? (
//         <div className="text-center text-gray-400 relative z-10">
//           <p className="text-2xl mb-4">No Audio to Display</p>
//           <motion.button
//             onClick={() => router.push("/upload")}
//             className="px-6 py-3 bg-green-800 rounded-lg hover:bg-green-600 transition-all text-lg font-semibold flex items-center gap-2"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <PlusCircle size={20} />
//             Generate One
//           </motion.button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 w-full relative z-10">
//           {audios.map((audio) => (
//             <motion.div
//               key={audio._id}
//               className="relative bg-gray-900 bg-opacity-80 p-6 rounded-xl shadow-lg flex items-center justify-between overflow-hidden"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               whileHover={{ scale: 1.02 }}
//             >
//               {/* Left Side - Details */}
//               <div className="text-white space-y-2 w-2/3">
//                 <h3 className="text-xl font-semibold flex items-center gap-2">
//                   <Music size={20} />
//                   {audio.prompt}
//                 </h3>
//                 <p className="text-gray-400 flex items-center gap-2">
//                   <Mic size={18} />
//                   <span>{audio.voiceType.toUpperCase()} Voice</span>
//                 </p>
//                 <p className="text-gray-400 flex items-center gap-2">
//                   <Timer size={18} />
//                   <span>{audio.duration} sec</span>
//                 </p>
//               </div>

//               {/* Right Side - Audio Player */}
//               <div className="w-1/3 flex justify-end">
//                 <audio controls className="w-32">
//                   <source src={audio.audioUrl} type="audio/mpeg" />
//                 </audio>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Music, Timer, Mic, PlusCircle, ArrowLeft } from "lucide-react";

export default function MyAudio() {
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const res = await fetch("/api/user/my-audio");
        const data = await res.json();
        if (data.success) {
          setAudios(data.audios);
        }
      } catch (error) {
        console.error("Error fetching audios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAudios();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="neumorph-loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Main content container */}
      <div className="neumorph-container max-w-6xl mx-auto p-6 relative z-10">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            onClick={() => router.back()}
            className="neumorph-icon-button p-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="text-gray-400" />
          </motion.button>
          
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            My Audio Files
          </h2>
          
          <motion.button
            onClick={() => router.push("/upload")}
            className="neumorph-icon-button-accent p-3 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlusCircle size={20} className="text-blue-400" />
          </motion.button>
        </div>

        {audios.length === 0 ? (
          <div className="neumorph-card p-10 text-center">
            <div className="mb-6">
              <div className="neumorph-icon-large mx-auto mb-6">
                <Music size={40} className="text-gray-400" />
              </div>
              <p className="text-2xl mb-6 text-gray-300">No Audio Files Found</p>
              <p className="text-gray-400 mb-10">Create your first audio file with AI</p>
            </div>
            
            <motion.button
              onClick={() => router.push("/upload")}
              className="neumorph-button-primary px-6 py-3 flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusCircle size={20} />
              <span>Generate Audio</span>
            </motion.button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {audios.map((audio) => (
              <motion.div
                key={audio._id}
                className="neumorph-card overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Audio waveform visualization */}
                <div className="neumorph-inset p-2 mb-4 h-20 flex items-center justify-center">
                  <div className="audio-waveform">
                    {[...Array(20)].map((_, i) => (
                      <div 
                        key={i} 
                        className="waveform-bar bg-gradient-to-t from-purple-500 to-blue-500"
                        style={{ 
                          height: `${Math.random() * 80 + 20}%`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Audio details */}
                  <div className="flex flex-col space-y-4 mb-4">
                    <h3 className="text-xl font-medium text-gray-100 truncate">
                      {audio.prompt}
                    </h3>
                    
                    <div className="flex flex-wrap gap-3">
                      <div className="neumorph-badge flex items-center gap-2 px-3 py-1">
                        <Mic size={14} className="text-purple-400" />
                        <span className="text-sm">{audio.voiceType.toUpperCase()}</span>
                      </div>
                      
                      <div className="neumorph-badge flex items-center gap-2 px-3 py-1">
                        <Timer size={14} className="text-blue-400" />
                        <span className="text-sm">{audio.duration} sec</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Audio controls */}
                  <div className="neumorph-audio-player mt-4">
                    <audio controls className="w-full">
                      <source src={audio.audioUrl} type="audio/mpeg" />
                    </audio>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Neuromorphic styles */}
      <style jsx global>{`
        .neumorph-container {
          background-color: #151515;
          border-radius: 20px;
          box-shadow: 20px 20px 60px #0d0d0d, -20px -20px 60px #1d1d1d;
        }
        
        .neumorph-card {
          background-color: #191919;
          border-radius: 16px;
          box-shadow: 8px 8px 16px #0f0f0f, -8px -8px 16px #232323;
        }
        
        .neumorph-inset {
          background-color: #151515;
          border-radius: 10px;
          box-shadow: inset 5px 5px 10px #0c0c0c, inset -5px -5px 10px #1e1e1e;
        }
        
        .neumorph-badge {
          background-color: #191919;
          border-radius: 8px;
          box-shadow: 3px 3px 6px #0f0f0f, -3px -3px 6px #232323;
        }
        
        .neumorph-icon-button {
          background-color: #191919;
          border-radius: 12px;
          box-shadow: 5px 5px 10px #101010, -5px -5px 10px #222222;
          transition: all 0.3s ease;
        }
        
        .neumorph-icon-button:active {
          box-shadow: inset 5px 5px 10px #101010, inset -5px -5px 10px #222222;
        }
        
        .neumorph-icon-button-accent {
          background-color: #191919;
          border-radius: 12px;
          box-shadow: 5px 5px 10px #101010, -5px -5px 10px #222222;
          transition: all 0.3s ease;
        }
        
        .neumorph-icon-button-accent:active {
          box-shadow: inset 5px 5px 10px #101010, inset -5px -5px 10px #222222;
        }
        
        .neumorph-icon-large {
          width: 80px;
          height: 80px;
          background-color: #191919;
          border-radius: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 8px 8px 16px #0f0f0f, -8px -8px 16px #232323;
        }
        
        .neumorph-button-primary {
          background: linear-gradient(145deg, #1a1a1a, #161616);
          border-radius: 10px;
          box-shadow: 5px 5px 10px #0d0d0d, -5px -5px 10px #252525;
          color: #fff;
          font-weight: 600;
          position: relative;
          overflow: hidden;
        }
        
        .neumorph-button-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #8a2be2, #4169e1);
          opacity: 0.1;
          transition: opacity 0.3s ease;
        }
        
        .neumorph-button-primary:hover::before {
          opacity: 0.2;
        }
        
        .neumorph-loader {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 5px solid #151515;
          border-top-color: #8a2be2;
          animation: spin 1s linear infinite;
          box-shadow: 0 0 15px rgba(138, 43, 226, 0.5);
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        .neumorph-audio-player {
          padding: 10px;
          border-radius: 12px;
          background: #191919;
          box-shadow: inset 3px 3px 6px #0f0f0f, inset -3px -3px 6px #232323;
        }
        
        .neumorph-audio-player audio {
          filter: sepia(20%) saturate(70%) grayscale(1) contrast(99%) invert(12%);
          width: 100%;
          height: 40px;
        }
        
        .audio-waveform {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          width: 100%;
        }
        
        .waveform-bar {
          width: 3px;
          border-radius: 3px;
          animation: pulse 1.5s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scaleY(0.6);
          }
          50% {
            transform: scaleY(1);
          }
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, #222 1px, transparent 1px),
            linear-gradient(to bottom, #222 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}