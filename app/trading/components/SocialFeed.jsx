"use client";

import React, { useEffect, useState } from "react";
import Newscard from "./NewsCard";
import RedditFeed from "./RedditFeed";
import InsightBox from "./InsightBox";

export default function SocialFeed() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

//   fetch coinmarketcap news
  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch( "/api/news");
        const data = await res.json();
        setNews(data.data);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-400 p-8">Loading latest crypto news...</div>
    );
  }

  return (
    <section className="p-8 bg-white/5 mt-8 rounded-xl">
      <h2 className="text-3xl font-semibold mb-4 text-center">Social Feed</h2>

      <InsightBox />

      <div className="grid md:grid-cols-2 gap-6 mb-10">{news.map((item)=> (
    
        <Newscard key={item.id} newsItem={item} />
      ))}</div>

      <h3 className="text-2xl font-semibold mb-4 text-center">Reddit Crypto Discussions</h3>
      <RedditFeed />

    </section>
  );
}
