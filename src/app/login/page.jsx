"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient, signIn } from "@/lib/auth-client";
import { Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function SigninPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams =  useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await signIn.email({
        email,
        password,
      });

      if (res?.error) {
        setError(res.error.message || "Login failed");
      } else {
        router.push(redirectTo);
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
      console.error(err);
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
      await authClient.signIn.social({
        provider: "google"
      })
    }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-b from-white via-indigo-50/40 to-white px-4 py-10">

      {/* 🌈 Animated Background Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 left-10 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-40"
        />

        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-10 right-10 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-40"
        />

      </div>

      {/* 📦 Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-md p-8 shadow-2xl"
      >

        {/* Logo */}
        <div className="text-center mb-8">

          <Link href="/">
            <h1 className="text-3xl font-bold text-gray-900 cursor-pointer">
              Startup<span className="text-indigo-600">Forge</span>
            </h1>
          </Link>

          <p className="text-gray-500 text-sm mt-3">
            Welcome back! Sign in to continue 🚀
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="mt-2 flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3 transition focus-within:border-indigo-500">

              <Mail className="w-5 h-5 text-gray-400" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="ml-3 w-full bg-transparent text-sm text-gray-700 outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="mt-2 flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3 transition focus-within:border-indigo-500">

              <Lock className="w-5 h-5 text-gray-400" />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="ml-3 w-full bg-transparent text-sm text-gray-700 outline-none"
                required
              />
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">

            <label className="flex items-center gap-2 text-gray-500">
              <input
                type="checkbox"
                className="rounded border-gray-300"
              />
              Remember me
            </label>

            <button
              type="button"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.01 }}
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing In..." : "Sign In"}
          </motion.button>

        </form>

        {/* Divider */}
        <div className="relative my-6">

          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>

          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-400">
              OR
            </span>
          </div>
        </div>

        {/* Google Login */}
        <motion.button
          onClick={handleGoogleSignIn}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01 }}
          type="button"
          className="w-full rounded-xl border border-gray-200 bg-white py-3 transition hover:border-indigo-300 flex items-center justify-center gap-3"
        >
          <FcGoogle className="w-5 h-5" />

          <span className="text-sm font-medium text-gray-700">
            Continue with Google
          </span>
        </motion.button>

        {/* Register */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href={`/register`}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Create Account
          </Link>
        </p>

      </motion.div>
    </section>
  );
}