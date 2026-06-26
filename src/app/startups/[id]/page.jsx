import { getStartupById } from '@/lib/api/startup';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const StartupDetailPage =async ({params}) => {
    const {id} = await params;
    const startup =await getStartupById(id)
    console.log(startup,"ifsdfs");

    return (
         <div className="min-h-screen bg-[#f6f8fc] py-10 px-4">
      
      <div className="max-w-5xl mx-auto">
        
        {/* Main Card */}
        <div className="bg-white rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-200">
          
          {/* Cover */}
          <div className="h-[240px] bg-gradient-to-r from-black to-gray-700 relative">
            
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Logo */}
            <div className="absolute -bottom-14 left-10">
              <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-white">
                <Image
                  src={startup.logo}
                  alt={startup.startupName}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="pt-20 px-10 pb-10">
            
            {/* Top */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              
              <div>
                <h1 className="text-4xl font-black text-gray-900">
                  {startup.startupName}
                </h1>

                <p className="mt-2 text-lg text-blue-600 font-medium capitalize">
                  {startup.industry}
                </p>
              </div>

              <span className="w-fit px-5 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold capitalize">
                {startup.fundingStage}
              </span>
            </div>

            {/* Description */}
            <div className="mt-10">
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About Startup
              </h2>

              <p className="text-gray-600 leading-relaxed text-lg">
                {startup.description}
              </p>
            </div>

            {/* Founder */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                
                <p className="text-sm text-gray-500">
                  Founder Email
                </p>

                <h3 className="mt-2 text-lg font-semibold text-gray-900 break-all">
                  {startup.founderEmail}
                </h3>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                
                <p className="text-sm text-gray-500">
                  Industry
                </p>

                <h3 className="mt-2 text-lg font-semibold text-gray-900 capitalize">
                  {startup.industry}
                </h3>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              
              <Link href={`/startups/${id}/apply`} className="px-7 py-3 rounded-2xl bg-black text-white font-medium hover:bg-gray-800 transition">
                Apply
              </Link>

              
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default StartupDetailPage;