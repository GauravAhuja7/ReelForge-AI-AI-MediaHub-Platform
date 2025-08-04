// "use client";

// import Link from "next/link";
// import { Home , Twitter , Instagram , Facebook } from "lucide-react";
// import { useNotification } from "./Notification";

// export default function Footer() {
//   const { showNotification } = useNotification();

//   return (
//     <footer className="bg-gray-900  text-white p-6 w-full mt-auto">
//       <div className="container mx-auto flex flex-wrap justify-between items-center">
//         {/* ✅ Branding */}
//         <div>
//           <Link
//             href="/"
//             className="flex items-center gap-2 text-xl font-bold hover:text-green-400 transition-colors duration-300"
//           >
//             <Home className="w-5 h-5" />
//             🎥 FeelToReel
//           </Link>
//           <p className="text-sm opacity-75 mt-2">
//             AI-Powered Video & Audio Generation.
//             <br />
//             © {new Date().getFullYear()} FeelToReel. All rights reserved.
//           </p>
//         </div>

//         {/* ✅ Contact Info */}
//         <div>
//           <span className="font-semibold">Contact</span>
//           <div className="mt-2 space-y-1">
//             <a
//               className="block cursor-pointer hover:text-green-400 transition-colors duration-300"
//               onClick={() =>
//                 showNotification("Email us at support@feeltoreel.com", "info")
//               }
//             >
//               support@feeltoreel.com
//             </a>
//             <a
//               className="block cursor-pointer hover:text-green-400 transition-colors duration-300"
//               onClick={() => showNotification("Call us: +91 987-XXX-6543", "info")}
//             >
//               +91 987-XXX-6543
//             </a>
//           </div>
//         </div>

//         {/* ✅ Social Media */}
//         <div>
//           <span className="font-semibold">Follow Us</span>
//           <div className="flex gap-4 mt-2">
//             {[
//               { name: "Twitter", icon: Twitter },
//               { name: "Instagram", icon: Instagram },
//               { name: "Facebook", icon: Facebook },
//             ].map((platform) => (
//               <a
//                 key={platform.name}
//                 className="cursor-pointer hover:text-green-400 transition-colors duration-300"
//                 onClick={() =>
//                   showNotification(`Follow us on ${platform.name}`, "info")
//                 }
//               >
//                 <platform.icon className="w-5 h-5" />
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }



"use client";

import Link from "next/link";
import { Home } from "lucide-react";
// Fix for the lucide-react import error - importing icons individually
import Twitter from "lucide-react/dist/esm/icons/twitter";
import Instagram from "lucide-react/dist/esm/icons/instagram";
import Facebook from "lucide-react/dist/esm/icons/facebook";
import { useNotification } from "./Notification";

export default function Footer() {
  const { showNotification } = useNotification();

  // Array of social media platforms with imported icons
  const socialPlatforms = [
    { name: "Twitter", icon: Twitter },
    { name: "Instagram", icon: Instagram },
    { name: "Facebook", icon: Facebook },
  ];

  return (
    <footer className="bg-gray-900 text-white p-6 w-full mt-auto">
      <div className="container mx-auto">
        {/* Divider with Neumorphic Effect */}
        <div className="mb-6 w-full h-px bg-gray-800 shadow-[0px_1px_2px_rgba(255,255,255,0.05)]"></div>
        
        <div className="flex flex-wrap justify-between items-start gap-6">
          {/* Branding with Neumorphic Effect */}
          <div className="p-4 rounded-xl bg-gray-850 shadow-[5px_5px_15px_rgba(0,0,0,0.5),-3px_-3px_15px_rgba(255,255,255,0.05)]">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold transition-colors duration-300"
            >
              <span className="p-1 rounded-lg bg-gray-800 shadow-[2px_2px_4px_rgba(0,0,0,0.5),-1px_-1px_4px_rgba(255,255,255,0.05)]">
                <Home className="w-5 h-5 text-blue-400" />
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                FeelToReel
              </span>
            </Link>
            <p className="text-sm text-gray-400 mt-3">
              AI-Powered Video & Audio Generation.
              <br />
              © {new Date().getFullYear()} FeelToReel. All rights reserved.
            </p>
          </div>

          {/* Contact Info with Neumorphic Effect */}
          <div className="p-4 rounded-xl bg-gray-850 shadow-[5px_5px_15px_rgba(0,0,0,0.5),-3px_-3px_15px_rgba(255,255,255,0.05)]">
            <span className="font-semibold text-blue-400">Contact</span>
            <div className="mt-3 space-y-2">
              <a
                className="block cursor-pointer text-gray-300 hover:text-blue-400 transition-colors duration-300"
                onClick={() =>
                  showNotification("Email us at support@feeltoreel.com", "info")
                }
              >
                support@feeltoreel.com
              </a>
              <a
                className="block cursor-pointer text-gray-300 hover:text-blue-400 transition-colors duration-300"
                onClick={() => showNotification("Call us: +91 987-XXX-6543", "info")}
              >
                +91 987-XXX-6543
              </a>
            </div>
          </div>

          {/* Social Media with Neumorphic Effect */}
          <div className="p-4 rounded-xl bg-gray-850 shadow-[5px_5px_15px_rgba(0,0,0,0.5),-3px_-3px_15px_rgba(255,255,255,0.05)]">
            <span className="font-semibold text-blue-400">Follow Us</span>
            <div className="flex gap-4 mt-3">
              {socialPlatforms.map((platform) => {
                const IconComponent = platform.icon;
                return (
                  <a
                    key={platform.name}
                    className="cursor-pointer p-2 rounded-lg bg-gray-800 shadow-[3px_3px_6px_rgba(0,0,0,0.5),-2px_-2px_6px_rgba(255,255,255,0.05)] hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.5),inset_-2px_-2px_6px_rgba(255,255,255,0.05)] transition-all duration-300"
                    onClick={() =>
                      showNotification(`Follow us on ${platform.name}`, "info")
                    }
                  >
                    <IconComponent className="w-5 h-5 text-purple-400" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}