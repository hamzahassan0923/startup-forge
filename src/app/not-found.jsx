"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-blue-50 via-white to-purple-100 flex items-center justify-center px-6">
      
      {/* Background Blur Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-20 animate-pulse" />

      <div className="relative z-10 text-center max-w-xl">
        
        {/* Animated 404 */}
        <motion.h1
          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
          }}
          className="text-[120px] md:text-[180px] font-extrabold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-none"
        >
          404
        </motion.h1>

        {/* Animated Text */}
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mt-2"
        >
          Oops! Page Not Found
        </motion.h2>

        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-gray-600 text-lg"
        >
          The page you are looking for doesn’t exist or was moved somewhere else.
        </motion.p>

        {/* Floating Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-black text-white px-8 py-4 text-lg font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            ← Back To Home
          </Link>
        </motion.div>

        {/* Floating Small Text */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="mt-10 text-sm text-gray-400"
        >
          Lost in the digital universe ✨
        </motion.div>
      </div>
    </main>
  );
}