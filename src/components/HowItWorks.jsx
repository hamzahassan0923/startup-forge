"use client";

import { motion } from "framer-motion";
import { UserPlus, Search, Handshake } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <UserPlus className="w-7 h-7 text-indigo-600" />,
      title: "Create Your Profile",
      desc: "Sign up as a Founder or Collaborator and build your professional startup profile.",
    },
    {
      icon: <Search className="w-7 h-7 text-indigo-600" />,
      title: "Browse Startups & Opportunities",
      desc: "Explore startup ideas and job opportunities that match your skills and interest.",
    },
    {
      icon: <Handshake className="w-7 h-7 text-indigo-600" />,
      title: "Apply & Build Teams",
      desc: "Apply to opportunities, get accepted, and start building real startup products.",
    },
  ];

  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-4">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            How It <span className="text-indigo-600">Works</span>
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Get started in just 3 simple steps and begin your startup journey.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">

          {/* connecting line (desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-gray-100 -z-10"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                boxShadow: "0px 15px 35px rgba(99,102,241,0.15)",
              }}
              className="relative bg-white border border-gray-100 rounded-2xl p-8 text-center transition-all duration-300"
            >
              {/* Step number */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-4 mt-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-50">
                  {step.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}