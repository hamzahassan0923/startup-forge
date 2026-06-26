"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Upload,
  FileText,
  Send,
} from "lucide-react";

export default function JobApplyPage() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // fake api delay
    setTimeout(() => {
      setLoading(false);
      alert("Application Submitted Successfully 🚀");
    }, 1500);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white px-4 py-10">
      <div className="mx-auto max-w-5xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-lg"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-2xl bg-indigo-100 p-3">
                  <Briefcase className="h-7 w-7 text-indigo-600" />
                </div>

                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Frontend Developer
                  </h1>

                  <p className="text-gray-500">
                    StartupForge Inc.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Remote
                </div>

                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  $1200 - $2000/month
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              Hiring Now
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 rounded-3xl border border-gray-100 bg-white p-8 shadow-lg"
          >
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Apply for this Position
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-indigo-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-indigo-500"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  placeholder="+8801XXXXXXXXX"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-indigo-500"
                />
              </div>

              {/* Resume Upload */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Upload Resume
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 transition hover:border-indigo-400 hover:bg-indigo-50">
                  <Upload className="mb-3 h-10 w-10 text-indigo-500" />

                  <p className="text-sm font-medium text-gray-700">
                    Click to upload your resume
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    PDF, DOC, DOCX
                  </p>

                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setResume(e.target.files[0])}
                  />
                </label>

                {resume && (
                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
                    <FileText className="h-4 w-4" />
                    {resume.name}
                  </div>
                )}
              </div>

              {/* Cover Letter */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Cover Letter
                </label>

                <textarea
                  rows={6}
                  placeholder="Tell us why you're a good fit..."
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-indigo-500"
                />
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-70"
              >
                <Send className="h-5 w-5" />

                {loading ? "Submitting..." : "Submit Application"}
              </motion.button>
            </form>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl border border-gray-100 bg-white p-8 shadow-lg h-fit"
          >
            <h3 className="mb-5 text-xl font-bold text-gray-900">
              Job Overview
            </h3>

            <div className="space-y-5 text-sm">
              
              <div>
                <p className="text-gray-400">Experience</p>
                <p className="mt-1 font-medium text-gray-800">
                  2+ Years
                </p>
              </div>

              <div>
                <p className="text-gray-400">Job Type</p>
                <p className="mt-1 font-medium text-gray-800">
                  Full Time
                </p>
              </div>

              <div>
                <p className="text-gray-400">Location</p>
                <p className="mt-1 font-medium text-gray-800">
                  Remote
                </p>
              </div>

              <div>
                <p className="text-gray-400">Deadline</p>
                <p className="mt-1 font-medium text-gray-800">
                  July 30, 2026
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}