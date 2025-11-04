"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";


function Hero() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-20 bg-gradient-to-br from-[#4B0082] via-[#2F2FA2] to-[#00C2FF] text-white overflow-hidden">
      
      <motion.div
        className="z-10 max-w-xl space-y-6"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Feel the Market.<br />Follow the Vibe.
        </h1>
        <p className="text-lg md:text-xl text-gray-200">
          TrendyCryptoVibe blends live crypto data, AI insights, and global social buzz —
          helping you catch the next big wave before it goes mainstream.
        </p>

        <div className="flex justify-center gap-6 mt-6 flex-wrap">
          <button className="px-8 py-3 font-semibold bg-[#FF00FF] text-[#0A0A0A] border-2 border-[#00FFF0] shadow-[0_0_10px_#00FFF0] hover:bg-transparent hover:text-[#00FFF0] hover:shadow-[0_0_25px_#00FFF0] transition-all duration-300 rounded-full !rounded-full">
            Explore Trends
          </button>
          <button className="px-8 py-3 font-semibold border-2 border-[#FF00FF] text-[#FF00FF] bg-transparent hover:bg-[#FF00FF] hover:text-[#00FFF0] hover:shadow-[0_0_25px_#FF00FF] transition-all duration-300 rounded-full !rounded-full">
            Join Community
          </button>
        </div>

        <p className="text-sm text-gray-300 mt-6">Powered by data. Driven by community.</p>
      </motion.div>

      <motion.div
        className="mt-10 md:mt-0"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
      >
        <Image
          src='/images/bit.gif'
          alt="Crypto vibe animation"
          width={550}
          height={600}
          className="rounded-2xl shadow-2xl"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_60%)]"></div>
    </section>
  );
}
export default Hero;
