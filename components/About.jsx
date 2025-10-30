'use client';
import React from "react";

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0a0024] to-[#1e003a] p-8">
      <div className=" mx-auto bg-black/60 backdrop-blur-lg border border-[#7f00ff]/50 rounded-2xl p-8 ">
        
        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#7f00ff] via-[#00e0ff] to-[#ff00c3] animate-pulse">
          About TrendyCryptoVibe
        </h1>

        {/* Intro */}
        <p className="text-gray-300 text-lg mb-6 leading-relaxed text-center">
          Welcome to <span className="text-[#00e0ff] font-semibold">TrendyCryptoVibe</span> — your go-to platform for real-time cryptocurrency insights and AI-powered market predictions.  
          We empower crypto traders, investors, and enthusiasts with live data and social sentiment to make smarter moves in the fast-paced digital market.
        </p>

        {/* Section */}
        <h2 className="text-2xl font-semibold text-[#00e0ff] mb-3">🚀 What We Offer</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-300">
          <li><strong className="text-[#ff00c3]">Live Dashboard:</strong> Real-time crypto prices, market caps, and volume updates.</li>
          <li><strong className="text-[#00e0ff]">AI Predictions:</strong> Analyze trends and forecast potential price movements using smart algorithms.</li>
          <li><strong className="text-[#7f00ff]">Social Integration:</strong> Track Reddit and social sentiment for trending coins.</li>
          <li><strong className="text-[#ff00c3]">Community Vibes:</strong> Join fellow enthusiasts to share insights, news, and strategies.</li>
        </ul>

        {/* Vision */}
        <h2 className="text-2xl font-semibold mt-8 mb-3 text-[#00e0ff]">🌌 Our Vision</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          At <span className="text-[#ff00c3] font-semibold">TrendyCryptoVibe</span>, we believe knowledge is the real power in crypto.
          By blending data analytics, AI, and community insights, we’re building a platform that educates, empowers, and inspires the next generation of digital investors.
        </p>

        <p className="text-gray-400 text-md mt-6 italic text-center">
          Together, let’s ride the neon waves of the crypto world 🌐⚡
        </p>
      </div>
    </div>
  );
}
