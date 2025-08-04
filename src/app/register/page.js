// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useNotification } from "@/components/Notification";
// import { Vortex } from "@/components/ui/vortex";
// // import Footer from "@/components/Footer";
// // import Header from "@/components/Header";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [emailExists, setEmailExists] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();
//   const { showNotification } = useNotification();

//   const checkEmailExists = async (email) => {
//     if (!email) return;
//     try {
//       const res = await fetch(`/api/auth/check-email?email=${email}`);
//       const data = await res.json();
//       setEmailExists(data.exists);
//     } catch (error) {
//       console.error("Error checking email:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!name || !email || !password || !confirmPassword) {
//       showNotification("All fields are required!", "error");
//       setLoading(false);
//       return;
//     }

//     if (password !== confirmPassword) {
//       showNotification("Passwords do not match!", "error");
//       setLoading(false);
//       return;
//     }

//     if (emailExists) {
//       showNotification("Email already exists!", "error");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error);

//       showNotification("Registration successful! Redirecting...", "success");
//       router.push("/login");
//     } catch (error) {
//       showNotification(error.message || "Failed to register", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen w-full bg-black text-white">
//       {/* ✅ Header (Will remain fixed or scrollable above) */}
//       {/* <Header /> */}

//       {/* ✅ Main content (Full screen background except footer) */}
//       <main className="flex-grow flex items-center justify-center relative">
//         {/* ✅ Background Lines in Center */}
//         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//           <Vortex />
//         </div>

//         {/* ✅ Centered Form */}
//         <div className="w-full max-w-md bg-transparent bg-opacity-80 p-6 rounded-lg shadow-lg z-10">
//           <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block font-semibold">Name</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full p-2 border rounded bg-black text-gray-300"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block font-semibold">Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                   checkEmailExists(e.target.value);
//                 }}
//                 className="w-full p-2 border rounded bg-black text-gray-300"
//                 required
//               />
//               {emailExists && <p className="text-red-400 text-sm mt-1">⚠️ Email already exists!</p>}
//             </div>

//             <div>
//               <label className="block font-semibold">Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full p-2 border rounded bg-black text-gray-300"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block font-semibold">Confirm Password</label>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="w-full p-2 border rounded bg-black text-gray-300"
//                 required
//               />
//               {password !== confirmPassword && (
//                 <p className="text-red-400 text-sm mt-1">⚠️ Passwords do not match!</p>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
//               disabled={loading}
//             >
//               {loading ? "Registering..." : "Register"}
//             </button>
//           </form>
//         </div>
//       </main>

//       {/* ✅ Footer (Will remain outside the main full-screen area) */}
//       {/* <Footer /> */}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/components/Notification";
import Link from "next/link";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { showNotification } = useNotification();

  const checkEmailExists = async (email) => {
    if (!email) return;
    try {
      const res = await fetch(`/api/auth/check-email?email=${email}`);
      const data = await res.json();
      setEmailExists(data.exists);
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      showNotification("All fields are required!", "error");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      showNotification("Passwords do not match!", "error");
      setLoading(false);
      return;
    }

    if (emailExists) {
      showNotification("Email already exists!", "error");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      showNotification("Registration successful! Redirecting...", "success");
      router.push("/login");
    } catch (error) {
      showNotification(error.message || "Failed to register", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center p-6">
      {/* Neuromorphic background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute w-64 h-64 rounded-full bg-gray-800 filter blur-3xl opacity-20 -top-10 -left-10"></div>
        <div className="absolute w-96 h-96 rounded-full bg-gray-800 filter blur-3xl opacity-15 bottom-0 right-0"></div>
        <div className="absolute w-48 h-48 rounded-full bg-blue-900 filter blur-3xl opacity-10 top-1/2 left-1/4"></div>
      </div>

      {/* Neuromorphic form card */}
      <div 
        className="w-full max-w-md p-8 rounded-2xl relative z-10"
        style={{
          background: 'linear-gradient(145deg, #1a1a1a, #212121)',
          boxShadow: '10px 10px 30px #0f0f0f, -10px -10px 30px #272727'
        }}
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">Create Account</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-2 rounded-full"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium text-sm mb-2 text-gray-300">Full Name</label>
            <div 
              className="rounded-lg"
              style={{
                background: '#1e1e1e',
                boxShadow: 'inset 3px 3px 7px #151515, inset -3px -3px 7px #272727'
              }}
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-transparent text-gray-200 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-sm mb-2 text-gray-300">Email Address</label>
            <div 
              className="rounded-lg"
              style={{
                background: '#1e1e1e',
                boxShadow: 'inset 3px 3px 7px #151515, inset -3px -3px 7px #272727'
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  checkEmailExists(e.target.value);
                }}
                className="w-full p-3 bg-transparent text-gray-200 outline-none"
                required
              />
            </div>
            {emailExists && <p className="text-red-400 text-sm mt-1">⚠️ Email already exists!</p>}
          </div>

          <div>
            <label className="block font-medium text-sm mb-2 text-gray-300">Password</label>
            <div 
              className="rounded-lg"
              style={{
                background: '#1e1e1e',
                boxShadow: 'inset 3px 3px 7px #151515, inset -3px -3px 7px #272727'
              }}
            >
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-transparent text-gray-200 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-sm mb-2 text-gray-300">Confirm Password</label>
            <div 
              className="rounded-lg"
              style={{
                background: '#1e1e1e',
                boxShadow: 'inset 3px 3px 7px #151515, inset -3px -3px 7px #272727'
              }}
            >
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 bg-transparent text-gray-200 outline-none"
                required
              />
            </div>
            {password !== confirmPassword && (
              <p className="text-red-400 text-sm mt-1">⚠️ Passwords do not match!</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-6 rounded-lg font-semibold transition-all duration-300"
            style={{
              background: 'linear-gradient(145deg, #232323, #1e1e1e)',
              boxShadow: '5px 5px 10px #141414, -5px -5px 10px #282828',
              border: '1px solid #333'
            }}
            disabled={loading}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              {loading ? "Creating Account..." : "Register"}
            </span>
          </button>
          
          <div className="text-center mt-6 text-gray-400">
            Already have an account?{" "}
            <Link 
              href="/login" 
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 transition"
            >
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}