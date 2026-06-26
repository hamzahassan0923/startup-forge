"use client";

import Image from "next/image";
import Link from "next/link";

export default function StartupCard({ startup }) {
  if (!startup) return null; // safe guard
        console.log(startup,"startup");
  return (
    <div className="w-full bg-white rounded-3xl border border-gray-200 p-5 shadow-sm hover:shadow-xl transition-all duration-300">
      
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        
        <div className="flex items-center gap-4">
          
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0">
            <Image
              src={startup.logo}
              alt={startup.startupName}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {startup.startupName}
            </h2>

            <p className="text-sm text-blue-600 font-medium mt-1">
              {startup.industry}
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
          {startup.fundingStage}
        </span>
      </div>

      {/* Description */}
      <p className="mt-5 text-sm text-gray-600 line-clamp-3">
        {startup.description}
      </p>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-xs text-gray-500 truncate">
          {startup.founderEmail}
        </p>

        <Link href={`startups/${startup._id}`} className="px-4 py-2 bg-black text-white text-sm rounded-xl hover:bg-gray-800">
          View
        </Link>
      </div>
    </div>
  );
}