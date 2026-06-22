"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";



import {
  Mail,
  Lock,
  User,
  Briefcase,
  ImageIcon,
  Eye,
  EyeOff,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { authClient, signUp } from "@/lib/auth-client";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("collaborator");

  const [image, setImage] = useState(null);

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Password Validation
  const validatePassword = (password) => {
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;

    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (!uppercase.test(password)) {
      return "Password must contain one uppercase letter";
    }

    if (!lowercase.test(password)) {
      return "Password must contain one lowercase letter";
    }

    return null;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {

      // Password Validation
      const passwordError =
        validatePassword(password);

      if (passwordError) {
        setError(passwordError);
        setLoading(false);
        return;
      }

      let imageUrl = "";

      // Upload Image To ImgBB
      if (image) {

        const formData = new FormData();

        formData.append("image", image);

        const apiKey =
          process.env.NEXT_PUBLIC_IMGBB_API_KEY;

        const imgbbURL =
          `https://api.imgbb.com/1/upload?key=${apiKey}`;

        const uploadResponse =
          await axios.post(
            imgbbURL,
            formData
          );

        imageUrl =
          uploadResponse.data.data.display_url;
      }

      // Register User
      const res = await signUp.email({
        name,
        email,
        password,
        role,
        image: imageUrl,
      });

      if (res?.error) {
        setError(
          res.error.message ||
            "Registration failed"
        );
      } else {

        setSuccess(
          "Account created successfully 🎉"
        );

        setName("");
        setEmail("");
        setPassword("");
        setImage(null);

        router.push("/");
      }

    } catch (err) {

      console.log(err);

      setError(
        "Something went wrong. Please try again."
      );
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google"
    })
  }

  return (
    <section className="min-h-screen bg-linear-to-b from-white via-indigo-50/40 to-white flex items-center justify-center px-4 py-10 overflow-hidden relative">

      {/* Background */}
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

      {/* Card */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-md border border-gray-100 rounded-3xl shadow-xl p-8 relative z-10"
      >

        {/* Logo */}
        <div className="text-center mb-8">

          <Link href="/">
            <h1 className="text-3xl font-bold text-gray-900 cursor-pointer">
              Startup
              <span className="text-indigo-600">
                Forge
              </span>
            </h1>
          </Link>

          <p className="text-gray-500 mt-3 text-sm">
            Create your account and start building startups 🚀
          </p>

        </div>

        {/* Success */}
        {success && (
          <div className="mb-4 p-3 rounded-xl bg-green-100 border border-green-200 text-green-600 text-sm">
            {success}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-100 border border-red-200 text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>

            <div className="mt-2 flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-white focus-within:border-indigo-500 transition">

              <User className="w-5 h-5 text-gray-400" />

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter your full name"
                className="w-full ml-3 outline-none bg-transparent text-sm text-gray-700"
                required
              />

            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="mt-2 flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-white focus-within:border-indigo-500 transition">

              <Mail className="w-5 h-5 text-gray-400" />

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                className="w-full ml-3 outline-none bg-transparent text-sm text-gray-700"
                required
              />

            </div>
          </div>

          {/* Profile Image */}
          <div>

            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Profile Image
            </label>

            <div className="border-2 border-dashed border-gray-200 hover:border-indigo-400 transition rounded-2xl p-4 bg-gray-50/60">

              <label className="flex items-center gap-4 cursor-pointer">

                {/* Preview */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-gray-200 flex items-center justify-center">

                  {image ? (
                    <Image
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      width={64}
                      height={64}
                    />
                  ) : (
                    <ImageIcon className="w-7 h-7 text-gray-400" />
                  )}

                </div>

                {/* Text */}
                <div className="flex-1">

                  <h4 className="text-sm font-semibold text-gray-800">
                    Upload image
                  </h4>

                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG up to 5MB
                  </p>

                </div>

                {/* Browse */}
                <div className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition">
                  Browse
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setImage(
                      e.target.files[0]
                    )
                  }
                  className="hidden"
                  required
                />

              </label>

            </div>

          </div>

          {/* Password */}
          <div>

            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="mt-2 flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-white focus-within:border-indigo-500 transition">

              <Lock className="w-5 h-5 text-gray-400" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="Minimum 6 characters"
                className="w-full ml-3 outline-none bg-transparent text-sm text-gray-700"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>

            </div>

            <ul className="text-xs text-gray-400 mt-2 space-y-1">
              <li>• Minimum 6 characters</li>
              <li>• One uppercase letter</li>
              <li>• One lowercase letter</li>
            </ul>

          </div>

          {/* Role */}
          <div>

            <label className="text-sm font-medium text-gray-700">
              Select Role
            </label>

            <div className="mt-2 flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-white focus-within:border-indigo-500 transition">

              <Briefcase className="w-5 h-5 text-gray-400" />

              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
                className="w-full ml-3 outline-none bg-transparent text-sm text-gray-700"
              >

                <option value="founder">
                  Founder
                </option>

                <option value="collaborator">
                  Collaborator
                </option>

              </select>

            </div>

          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.01 }}
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-medium transition disabled:opacity-70"
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </motion.button>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-2">

            <div className="absolute w-full border-t border-gray-200"></div>

            <span className="relative bg-white px-4 text-sm text-gray-400">
              OR
            </span>

          </div>

          {/* Google Button */}
          <motion.button
          onClick={handleGoogleSignIn}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.01 }}
            type="button"
            className="w-full border border-gray-200 hover:border-indigo-300 bg-white py-3 rounded-xl flex items-center justify-center gap-3 transition"
          >

            <FcGoogle className="w-5 h-5" />

            <span className="text-sm font-medium text-gray-700">
              Continue with Google
            </span>

          </motion.button>

        </form>

        {/* Login */}
        <p className="text-center text-sm text-gray-500 mt-8">

          Already have an account?{" "}

          <Link
            href="/login"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Login
          </Link>

        </p>

      </motion.div>
    </section>
  );
}