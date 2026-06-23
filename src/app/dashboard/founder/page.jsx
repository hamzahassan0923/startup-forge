"use client";

import { Briefcase, FileText, Users } from "lucide-react";

const stats = [
  {
    title: "Total Opportunities",
    value: 24,
    icon: Briefcase,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Total Applications",
    value: 138,
    icon: FileText,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Accepted Members",
    value: 1233,
    icon: Users,
    color: "from-emerald-500 to-green-500",
  },
];

export default function FounderOverview() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Founder Dashboard
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Dashboard Overview
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-zinc-900"
            >
              {/* Background Glow */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
              />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {item.title}
                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-black dark:text-white">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br ${item.color} shadow-lg`}
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}