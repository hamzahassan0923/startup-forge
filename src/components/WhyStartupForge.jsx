"use client";

import { motion } from "framer-motion";
import { Users, Rocket, Briefcase, ShieldCheck } from "lucide-react";

export default function WhyStartupForge() {
  const features = [
    {
      icon: <Rocket className="w-7 h-7 text-indigo-600" />,
      title: "Build Startup Teams Faster",
      desc: "Launch your startup idea quickly with ready-to-join collaborators.",
    },
    {
      icon: <Users className="w-7 h-7 text-indigo-600" />,
      title: "Find Skilled People",
      desc: "Connect with developers, designers, and marketers instantly.",
    },
    {
      icon: <Briefcase className="w-7 h-7 text-indigo-600" />,
      title: "Real Opportunities",
      desc: "Work on real startup ideas that are actively building products.",
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-indigo-600" />,
      title: "Safe & Secure System",
      desc: "Track applications, status, and manage everything securely.",
    },
  ];

  return (
    <section className="relative w-full py-24 overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-white">

      {/* 🌈 Soft Background Glow Layer */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-purple-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 left-10 w-[400px] h-[400px] bg-blue-100 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            Why <span className="text-indigo-600">StartupForge</span>?
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            A modern ecosystem where founders and collaborators build real startups together.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.03,
                boxShadow: "0px 18px 40px rgba(99,102,241,0.15)",
              }}
              className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-6 transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-50 mb-4">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}