// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { LogOut,  Video, Music, Shield, Calendar, Zap } from "lucide-react";
// import { BackgroundBeams } from "@/components/ui/background-beams";

// export default function ProfilePage() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch("/api/user");
//         if (!res.ok) {
//           throw new Error("Failed to fetch user data");
//         }
//         const data = await res.json();
//         setUser(data.user);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-black text-white">
//         <h1 className="text-3xl">Loading user data...</h1>
//       </div>
//     );
//   }

//   if (error || !user) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-black text-white">
//         <h1 className="text-3xl">{error || "Unauthorized. Please log in."}</h1>
//       </div>
//     );
//   }

//   console.log(user);

//   // ✅ Provide safe defaults
//   const subscription = user.subscription || { plan: "free", expiresAt: null };
//   const maxVideoLength = user.maxVideoLength ?? 10;
//   const maxAudioLength = user.maxAudioLength ?? 30;
//   const credits = user.credits ?? 1;

//   return (
//     <div className="relative min-h-screen bg-black text-white flex flex-col">
//       {/* 🔥 Animated Background */}
//       <BackgroundBeams className="absolute inset-0 -z-10" />

//       {/* ✅ Profile Content Container */}
//       <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full px-10 py-10 lg:py-20 space-y-10 lg:space-y-0">
        
//         {/* ✅ Left Section - Profile Image & Name */}
//         <motion.div
//           className="flex flex-col items-center text-center space-y-4 lg:w-1/3"
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//         >
//           {/* 📸 Profile Image */}
//           <Image
//             src="/default-avatar.jpeg"
//             alt="Profile Picture"
//             width={150}
//             height={150}
//             className="w-36 h-36 rounded-full border-4 border-green-500 shadow-lg"
//           />
//           <h2 className="text-3xl font-bold">{user.name}</h2>
//           <p className="text-gray-400 text-lg">{user.email}</p>
//         </motion.div>

//         {/* ✅ Right Section - User Info */}
//         <motion.div
//           className="flex flex-col w-full lg:w-2/3 space-y-6"
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//         >
//           {/* 🛠 User Details */}
//           <ProfileDetail icon={<Shield size={20} />} label="Role" value={user.role || "User"} />
//           <ProfileDetail icon={<Zap size={20} />} label="Credits Left" value={credits} />
//           <ProfileDetail icon={<Video size={20} />} label="Max Video Length" value={`${maxVideoLength} sec`} />
//           <ProfileDetail icon={<Music size={20} />} label="Max Audio Length" value={`${maxAudioLength} sec`} />
//           <ProfileDetail icon={<Calendar size={20} />} label="Subscription Plan" value={subscription.plan.toUpperCase()} />
//         </motion.div>
//       </div>

//       {/* ✅ Action Buttons */}
//       <div className="flex justify-center gap-6 mt-6">
//         <motion.button
//           onClick={() => router.push("/upload")}
//           className="px-6 py-3 bg-green-500 rounded-lg hover:bg-green-600 transition-all text-lg font-semibold"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Generate AI Content
//         </motion.button>

//         <motion.button
//           onClick={() => router.push("/pricing")}
//           className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-all text-lg font-semibold"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Upgrade Plan
//         </motion.button>
//       </div>

//       {/* ❌ Logout Button */}
//       <motion.button
//         onClick={() => signOut({ callbackUrl: "/login" })}
//         className="mt-10 mx-auto w-fit px-6 py-3 bg-red-500 rounded-lg hover:bg-red-600 flex items-center gap-2 transition-all text-lg font-semibold"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <LogOut size={20} />
//         Logout
//       </motion.button>

//       <br/>
//       <br/>
//     </div>
//   );
// }

// /* ✅ Reusable Profile Detail Row */
// const ProfileDetail = ({ icon, label, value }) => (
//   <motion.div
//     className="flex justify-between items-center p-4 bg-gray-900 bg-opacity-60 border border-gray-700 rounded-md hover:scale-105 transition-all"
//     whileHover={{ scale: 1.05 }}
//   >
//     <div className="flex items-center gap-3 text-gray-300">
//       {icon}
//       <span className="text-lg">{label}</span>
//     </div>
//     <span className="text-white text-lg font-semibold">{value}</span>
//   </motion.div>
// );



"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { LogOut, Video, Music, Shield, Calendar, Zap } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="neumorph-loader"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="neumorph-card p-8">
          <h1 className="text-3xl">{error || "Unauthorized. Please log in."}</h1>
        </div>
      </div>
    );
  }

  // Provide safe defaults
  const subscription = user.subscription || { plan: "free", expiresAt: null };
  const maxVideoLength = user.maxVideoLength ?? 10;
  const maxAudioLength = user.maxAudioLength ?? 30;
  const credits = user.credits ?? 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      {/* Subtle gradient background overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Main content container */}
      <div className="neumorph-container max-w-6xl mx-auto rounded-3xl p-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left section - Profile */}
          <div className="neumorph-card w-full lg:w-1/3 p-8 flex flex-col items-center">
            <div className="neumorph-inset p-1 rounded-full mb-6">
              <div className="neumorph-profile-ring">
                <Image
                  src="/default-avatar.jpeg"
                  alt="Profile Picture"
                  width={150}
                  height={150}
                  className="rounded-full"
                />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              {user.name}
            </h2>
            <p className="text-gray-400 mb-4">{user.email}</p>
            
            <div className="neumorph-badge w-full p-3 mb-4 flex items-center justify-center gap-2">
              <Shield size={16} className="text-green-400" />
              <span className="font-medium">{user.role || "User"}</span>
            </div>
            
            <div className="neumorph-progress-container w-full mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Credits</span>
                <span className="text-sm text-green-400">{credits}</span>
              </div>
              <div className="neumorph-progress-bar">
                <div 
                  className="neumorph-progress-fill bg-gradient-to-r from-green-400 to-blue-500" 
                  style={{ width: `${Math.min(credits * 10, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <motion.button
              onClick={() => router.push("/upload")}
              className="neumorph-button-primary w-full mb-4"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Generate AI Content
            </motion.button>
            
            <motion.button
              onClick={() => router.push("/pricing")}
              className="neumorph-button-secondary w-full"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Upgrade Plan
            </motion.button>
          </div>
          
          {/* Right section - Details */}
          <div className="w-full lg:w-2/3 space-y-6">
            <div className="neumorph-card p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Your Subscription
              </h3>
              
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="neumorph-icon">
                    <Calendar size={20} className="text-blue-400" />
                  </div>
                  <span>Current Plan</span>
                </div>
                <div className="neumorph-badge px-3 py-1">
                  {subscription.plan.toUpperCase()}
                </div>
              </div>
              
              <div className="neumorph-divider my-4"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="neumorph-stat-card p-4">
                  <div className="flex justify-between items-center">
                    <div className="neumorph-icon">
                      <Video size={20} className="text-green-400" />
                    </div>
                    <span className="text-lg font-bold">{maxVideoLength} sec</span>
                  </div>
                  <span className="text-sm text-gray-400">Max Video Length</span>
                </div>
                
                <div className="neumorph-stat-card p-4">
                  <div className="flex justify-between items-center">
                    <div className="neumorph-icon">
                      <Music size={20} className="text-green-400" />
                    </div>
                    <span className="text-lg font-bold">{maxAudioLength} sec</span>
                  </div>
                  <span className="text-sm text-gray-400">Max Audio Length</span>
                </div>
                
                <div className="neumorph-stat-card p-4">
                  <div className="flex justify-between items-center">
                    <div className="neumorph-icon">
                      <Zap size={20} className="text-green-400" />
                    </div>
                    <span className="text-lg font-bold">{credits}</span>
                  </div>
                  <span className="text-sm text-gray-400">Available Credits</span>
                </div>
              </div>
            </div>
            
            <div className="neumorph-card p-6">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Recent Activity
              </h3>
              
              <div className="neumorph-inset p-4 mb-4 rounded-lg">
                <p className="text-gray-400">No recent activity to display.</p>
              </div>
              
              <div className="flex justify-end">
                <motion.button
                  onClick={() => router.push("/activity")}
                  className="neumorph-button-text"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Activity
                </motion.button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Logout button */}
        <div className="mt-8 flex justify-center">
          <motion.button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="neumorph-button-danger flex items-center gap-2 px-6 py-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={20} />
            Logout
          </motion.button>
        </div>
      </div>
      
      {/* Add neuromorphic styles */}
      <style jsx global>{`
        .neumorph-container {
          background-color: #151515;
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
        
        .neumorph-icon {
          background-color: #191919;
          border-radius: 8px;
          padding: 8px;
          box-shadow: 3px 3px 6px #0f0f0f, -3px -3px 6px #232323;
        }
        
        .neumorph-button-primary {
          background: linear-gradient(145deg, #1a1a1a, #161616);
          border-radius: 10px;
          padding: 12px 20px;
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
          background: linear-gradient(90deg, #3a7bd5, #00d2ff);
          opacity: 0.1;
          transition: opacity 0.3s ease;
        }
        
        .neumorph-button-primary:hover::before {
          opacity: 0.2;
        }
        
        .neumorph-button-secondary {
          background: linear-gradient(145deg, #1a1a1a, #161616);
          border-radius: 10px;
          padding: 12px 20px;
          box-shadow: 5px 5px 10px #0d0d0d, -5px -5px 10px #252525;
          color: #3a7bd5;
          font-weight: 600;
        }
        
        .neumorph-button-danger {
          background: linear-gradient(145deg, #1a1a1a, #161616);
          border-radius: 10px;
          padding: 12px 20px;
          box-shadow: 5px 5px 10px #0d0d0d, -5px -5px 10px #252525;
          color: #ff4d4d;
          font-weight: 600;
        }
        
        .neumorph-button-text {
          background: transparent;
          color: #3a7bd5;
          padding: 8px 16px;
          font-weight: 500;
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        
        .neumorph-button-text:hover {
          background-color: rgba(58, 123, 213, 0.1);
        }
        
        .neumorph-progress-container {
          padding: 10px;
        }
        
        .neumorph-progress-bar {
          height: 10px;
          background-color: #151515;
          border-radius: 5px;
          box-shadow: inset 3px 3px 6px #0c0c0c, inset -3px -3px 6px #1e1e1e;
          overflow: hidden;
        }
        
        .neumorph-progress-fill {
          height: 100%;
          border-radius: 5px;
          transition: width 0.5s ease;
        }
        
        .neumorph-profile-ring {
          padding: 4px;
          border-radius: 50%;
          background: linear-gradient(145deg, #191919, #151515);
          box-shadow: 8px 8px 16px #0c0c0c, -8px -8px 16px #222222;
        }
        
        .neumorph-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #2a2a2a, transparent);
        }
        
        .neumorph-stat-card {
          background: linear-gradient(145deg, #1a1a1a, #161616);
          border-radius: 12px;
          box-shadow: 5px 5px 10px #101010, -5px -5px 10px #222222;
        }
        
        .neumorph-loader {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 5px solid #151515;
          border-top-color: #3a7bd5;
          animation: spin 1s linear infinite;
          box-shadow: 0 0 15px rgba(58, 123, 213, 0.5);
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
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