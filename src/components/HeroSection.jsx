'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  // স্লাইডার এবং টাইমলাইনের স্টেপ ডেটা
  const steps = [
    { name: 'Ideation', img: '/startup-forge-1.jpg', label: 'PREMIUM PARTNERS' },
    { name: 'Validation', img: '/startup-forge-2.jpg', label: 'GLOBAL REACH' },
    { name: 'Growth', img: '/startup-forge-3.jpg', label: 'SCALING SUCCESS' },
    { name: 'Scaling Success', img: '/startup-forge-4.jpg', label: 'GLOBAL IMPACT' }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // অটো-প্লে মেকানিজম (প্রতি ৪ সেকেন্ডে ইমেজ ও টাইমলাইন ট্র্যাক চেঞ্জ হবে)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section className="relative w-full min-h-screen bg-slate-50 text-slate-900 overflow-hidden flex items-center justify-center py-16 px-4 sm:px-8">
      {/* Background Soft Light Abstract Curves */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-60">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-blue-200 via-purple-100 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-red-100 via-amber-100 to-transparent rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* ================= LEFT COLUMN: ADVANCED CURVED STAGE DISPLAY ================= */}
        <div className="lg:col-span-6 flex flex-col items-center w-full">
          {/* Curved Theater Display Container */}
          <div className="relative w-full aspect-[16/10] rounded-[2rem] p-1 bg-gradient-to-b from-white to-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden group perspective-1000">
            <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden transform transition-all duration-700 group-hover:scale-[1.01]">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    idx === activeIndex 
                      ? 'opacity-100 scale-100 pointer-events-auto' 
                      : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <Image
                    src={step.img}
                    alt={step.name}
                    fill
                    priority={idx === 0}
                    className="object-cover"
                  />
                  {/* Image Overlays for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                  
                  {/* Floating Badge inside Image */}
                  <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-blue-700 shadow-sm">
                    {step.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Accent Bottom Bar */}
            <div className="absolute bottom-0 inset-x-0 h-[4px] bg-gradient-to-r from-blue-600 via-purple-600 to-red-500" />
          </div>

          {/* Interactive Flow Timeline (Ideation -> Validation -> Growth...) */}
          <div className="w-full mt-8 bg-white/80 backdrop-blur-md border border-slate-200 p-4 rounded-2xl flex flex-wrap justify-between items-center gap-2 shadow-sm">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                <button
                  onClick={() => setActiveIndex(idx)}
                  className={`text-xs md:text-sm font-bold transition-all duration-300 px-3 py-1.5 rounded-lg ${
                    idx === activeIndex
                      ? 'text-blue-700 bg-blue-50 shadow-[0_4px_12px_rgba(29,78,216,0.1)]'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {step.name} {idx === activeIndex && '(Active)'}
                </button>
                {idx < steps.length - 1 && (
                  <span className="text-slate-300 font-light hidden sm:inline">➔</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ================= RIGHT COLUMN: HIGH CONTRAST BRAND TEXT (WHITE THEME) ================= */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 lg:pl-6 text-left">
          {/* Main Top Badge */}
          <div className="flex items-center space-x-3">
            <div className="bg-slate-900 p-2 rounded-xl shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-black tracking-wider text-slate-900">STARTUP FORGE</h4>
              <p className="text-[10px] text-slate-500 tracking-widest uppercase -mt-1">For Global Solutions</p>
            </div>
          </div>

          {/* Core Typography */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none uppercase text-slate-900">
            <span className="text-blue-600 block">INNOVATION.</span>
            <span className="text-slate-900 block my-1">COOPERATION.</span>
            <span className="text-red-500 block">ASSISTANCE.</span>
          </h1>

          {/* Core Body Paragraph */}
          <p className="text-slate-600 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-xl">
            We are here to accelerate mature partners. Our global collaborative network will define the next 
            sustainable phase. Let us integrate your AI solutions at scale. Connect with our customized global 
            reach insights. Schedule your scaling strategy session.
          </p>

          {/* Decorative Heading */}
          <div className="pt-4 border-t border-slate-200">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800">
              Partnering for a global sustainable future.
            </h2>
          </div>

          {/* Premium Call To Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button className="px-8 py-4 bg-white border-2 border-slate-900 text-slate-900 font-bold rounded-xl transition-all duration-200 uppercase tracking-wider text-xs hover:bg-slate-900 hover:text-white shadow-sm">
              Customize My Request
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl transition-all duration-200 uppercase tracking-wider text-xs shadow-md shadow-red-500/20 hover:brightness-105">
              Apply For Consultation
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
