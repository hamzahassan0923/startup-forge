"use client";

import React from 'react';

export default function FeaturedStartups({ startupsList }) {
  console.log(startupsList,"staratup bahi");
  
 

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Startups
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-gray-500">
            সর্বশেষ যুক্ত হওয়া স্টার্টআপ কার্ডগুলো নিচে দেখুন।
          </p>
        </div>

       
         

       
         {/* {displayedStartups.length === 0 && (
           <p className="text-center text-gray-500 mt-6">কোনো স্টার্টআপ ডাটা পাওয়া যায়নি।</p>
         )}   */}

      </div>
    </section>
  );
}