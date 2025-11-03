'use client';
import React from "react";

const cards = [
  {
    title: "🚀 Mission",
    content:
      "Empower crypto enthusiasts with real-time market insights, AI-powered predictions, and social sentiment data to make informed decisions.",
    color: "#ff00c3",
  },
  {
    title: "🌌 Vision",
    content:
      "Create a platform that educates, inspires, and connects the next generation of digital investors in a futuristic, cyberpunk-styled interface.",
    color: "#00e0ff",
  },
  {
    title: "🛠 Services Offered",
    content:
      "Live Dashboard, AI Predictions, Social Media Integration, Community Engagement, and personalized watchlists for tracking your favorite coins.",
    color: "#7f00ff",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0024] to-[#1e003a] p-8 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7f00ff] via-[#00e0ff] to-[#ff00c3] animate-pulse mb-10">
        About TrendyCryptoVibe
      </h1>

      {/* Horizontal Scroll Cards */}
      <div className="flex space-x-6 overflow-x-auto pb-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="min-w-[300px] max-h-flex-shrink-0 bg-black/60 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-[0_0_25px_#7f00ff90] transition-transform hover:scale-105"
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: card.color }}
            >
              {card.title}
            </h2>
            <p className="text-gray-300 leading-relaxed">{card.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
