import Image from 'next/image';
import React from 'react';
import bannerImage from '@/app/assets/banner.png'

const Benner = () => {
    return (
        <div className="bg-[#121318] text-white rounded-2xl p-8 md:p-12 my-6 flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-800">
            <div>
                <span className="text-lime-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
          WORKOUT LIBRARY
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-none">
          TRAIN WITH INTENT. LOG EVERY SET.
        </h1>

        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
          <span className="font-semibold text-gray-200">FitLog</span> is a dark, no-nonsense gym companion: pick a lift, lock it into todays plan, and watch the weeks work add up.
        </p>
        <div>
          <button className="bg-lime-400 hover:bg-lime-500 text-black font-bold px-6 py-3 rounded-xl transition duration-200 uppercase text-sm tracking-wide">
            BROWSE WORKOUTS
          </button>
        </div>

            </div>
            <div className="relative w-full max-w-sm md:max-w-md flex justify-center">
                <Image src={bannerImage} alt="Gym Equipment Banner"  width={400}  height={400} className="object-contain" priority/>

            </div>
            
        </div>
    );
};

export default Benner;