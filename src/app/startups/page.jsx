

import StartupCard from '@/components/Cards/Startup';
import { getStartup } from '@/lib/api/startup';

import React from 'react';

const StartupPage =async () => { 
 const startupId = "6a39011c03f916802acf8189";
    const startup= await getStartup(startupId);
    console.log(startup);
        
    return (
        <div className="min-h-screen bg-[#f6f8fc]">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-14">
        
        {/* Blur Effects */}
        <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-blue-200/40 rounded-full blur-3xl"></div>

        <div className="absolute top-[20%] right-[-120px] w-[300px] h-[300px] bg-purple-200/30 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          
          {/* Top Content */}
          <div className="text-center max-w-3xl mx-auto">
            
          

            <h1 className=" text-5xl md:text-6xl font-black text-gray-900 leading-tight">
              Discover Amazing
              <span className="block text-gray-500">
                Startups
              </span>
            </h1>

            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              Explore innovative startups, founders, and future-changing ideas.
            </p>

            {/* Search */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              
              <input
                type="text"
                placeholder="Search startup..."
                className="w-full sm:w-[420px] px-6 py-4 rounded-2xl border border-gray-200 bg-white shadow-sm outline-none focus:ring-2 focus:ring-black/10"
              />

              <button className="px-7 py-4 rounded-2xl bg-black text-white font-medium hover:scale-105 transition">
                Explore
              </button>
            </div>
          </div>

          {/* Startup Cards */}
          <div >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {startup.map((startup, index) => (
          <StartupCard
            key={index}
            startup={startup}
          />
        ))}
            </div>

          </div>
        </div>
      </section>
    </div>
    );
};

export default StartupPage;