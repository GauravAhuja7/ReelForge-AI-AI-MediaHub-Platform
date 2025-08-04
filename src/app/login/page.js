// "use client";

// import { signIn } from "next-auth/react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useNotification } from "@/components/Notification";
// import Link from "next/link";
// import { Vortex } from "@/components/ui/vortex";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();
//   const { showNotification } = useNotification();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const result = await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//     });

//     if (result?.error) {
//       showNotification(result.error, "error");
//     } else {
//       showNotification("Login successful!", "success");
//       router.push("/");
//     }
    
//     setLoading(false);
//   };

//   return (
//     <div className="relative flex items-center justify-center min-h-screen w-full bg-black text-white">
//       {/* Background Effect */}
//       <div className="absolute inset-0">
//         <Vortex />
//       </div>

//       {/* Login Form */}
//       <div className="relative max-w-md w-full bg-transparent bg-opacity-80 p-6 rounded-lg shadow-lg z-10">
//         <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Email Input */}
//           <div>
//             <label htmlFor="email" className="block mb-1">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-3 py-2 border rounded bg-black text-white"
//             />
//           </div>

//           {/* Password Input */}
//           <div>
//             <label htmlFor="password" className="block mb-1">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-3 py-2 border rounded bg-black text-gray-300"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 hover:bg-blue-600 text-gray-300 py-2 rounded"
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           {/* Register Link */}
//           <p className="text-center mt-4">
//             Don&apos;t have an account?{" "}
//             <Link href="/register" className="text-blue-400 hover:text-blue-600">
//               Register
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }



"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/components/Notification";
import Link from "next/link";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { showNotification } = useNotification();

  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      showNotification("Failed to log in with Google.", "error");
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      showNotification(result.error, "error");
    } else {
      showNotification("Login successful!", "success");
      router.push("/");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center p-6">
      {/* Neuromorphic background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute w-72 h-72 rounded-full bg-gray-800 filter blur-3xl opacity-20 top-20 -right-20"></div>
        <div className="absolute w-80 h-80 rounded-full bg-gray-800 filter blur-3xl opacity-15 -bottom-20 -left-20"></div>
        <div className="absolute w-56 h-56 rounded-full bg-blue-900 filter blur-3xl opacity-10 bottom-1/3 right-1/4"></div>
      </div>

      {/* Neuromorphic form card */}
      <div 
        className="w-full max-w-md p-8 rounded-2xl relative z-10"
        style={{
          background: 'linear-gradient(145deg, #1a1a1a, #212121)',
          boxShadow: '10px 10px 30px #0f0f0f, -10px -10px 30px #272727'
        }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-2 rounded-full"></div>
          <p className="text-gray-400 mt-2 text-sm">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
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
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-transparent text-gray-200 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block font-medium text-sm text-gray-300">Password</label>
              <a href="#" className="text-xs text-gray-400 hover:text-blue-400 transition">Forgot Password?</a>
            </div>
            <div 
              className="rounded-lg"
              style={{
                background: '#1e1e1e',
                boxShadow: 'inset 3px 3px 7px #151515, inset -3px -3px 7px #272727'
              }}
            >
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-transparent text-gray-200 outline-none"
                required
              />
            </div>
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              {loading ? "Signing In..." : "Login"}
            </span>
          </button>
          
          <div className="relative flex items-center justify-center mt-6">
            <div className="h-px w-full bg-gray-700"></div>
            <div className="absolute bg-gray-800 px-4 text-gray-400 text-xs">OR</div>
          </div>
          
          <button
  type="button"
  className="w-full py-3 rounded-lg font-medium flex items-center justify-center mt-4 transition-all duration-300"
  onClick={handleGoogleLogin}
  style={{
    background: 'linear-gradient(145deg, #1e1e1e, #181818)',
    boxShadow: '3px 3px 6px #131313, -3px -3px 6px #232323',
    border: '1px solid #2a2a2a'
  }}
>
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
  Continue with Google
</button>

          
          <div className="text-center mt-6 text-gray-400">
            Don&apos;t have an account?{" "}
            <Link 
              href="/register" 
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 transition"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;