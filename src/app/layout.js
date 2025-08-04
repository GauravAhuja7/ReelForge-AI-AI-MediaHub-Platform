"use client";

import { Geist } from "next/font/google"; 
import "./globals.css";
import Header from "@/components/Navbar";
import { usePathname } from "next/navigation";
import Script from "next/script";
import Providers from "@/components/Providers";
import Footer from "@/components/Footer";

// ✅ Correctly define font loader
const geist = Geist({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={`${geist.className} flex flex-col bg-black min-h-screen`}>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
        <Providers>
          <Header />
          {/* ✅ Apply different layouts for home vs other pages */}
          <main className={pathname === "/" ? "w-full" : "w-full"}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
