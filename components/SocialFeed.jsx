"use client";

import React from "react";

export default function SocialFeed() {
  const posts = [
    { id: 1, user: "CryptoQueen", content: "BTC breaking resistance again! 🚀" },
    { id: 2, user: "DeFiGuru", content: "ETH merge effects still underrated 💎" },
    { id: 3, user: "TrendWatcher", content: "Altcoin season might be close..." },
  ];

  return (
    <section className="p-8 bg-white/5 mt-8 rounded-xl">
      <h2 className="text-3xl font-semibold mb-4 text-center">Social Feed</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 bg-white/10 rounded-lg">
            <h4 className="font-bold text-lg">@{post.user}</h4>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
