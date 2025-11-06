'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaReddit, FaTwitter, FaTiktok, FaTelegram } from "react-icons/fa";

export default function CommunityPage() {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    async function fetchSocialFeed() {
      try {
        const res = await fetch("/api/social");
        const data = await res.json();
        if (data.success) {
          setPosts(data.data);
          setFiltered(data.data);
        }
      } catch (error) {
        console.error("Failed to load social feed:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSocialFeed();
  }, []);

  const getIcon = (source, size = "text-2xl") => {
    switch (source) {
      case "Reddit":
        return <FaReddit className={`text-orange-500 ${size}`} />;
      case "Twitter":
        return <FaTwitter className={`text-sky-400 ${size}`} />;
      case "TikTok":
        return <FaTiktok className={`text-pink-500 ${size}`} />;
      case "Telegram":
        return <FaTelegram className={`text-blue-500 ${size}`} />;
      default:
        return null;
    }
  };

  const handleFilter = (source) => {
    setActiveFilter(source);
    if (source === "All") {
      setFiltered(posts);
    } else {
      setFiltered(posts.filter((p) => p.source === source));
    }
  };

  if (loading) {
    return (
      <section className="flex justify-center items-center min-h-[60vh] bg-[#0A0A0A]">
        <p className="text-gray-400 animate-pulse">Loading social buzz...</p>
      </section>
    );
  }

  return (
    <section className="px-6 md:px-12 py-16 bg-gradient-to-br from-[#0A0A0A] via-[#1A1A2E] to-[#4B0082] min-h-screen text-white">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-[#00FFF0] drop-shadow-[0_0_20px_#00FFF0]">
          Community Vibes
        </h1>
        <p className="text-gray-300">
          Dive into the latest buzz from Reddit, Twitter, TikTok, and Telegram.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {["All", "Reddit", "Twitter", "TikTok", "Telegram"].map((source) => (
          <motion.button
            key={source}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleFilter(source)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold border-2 transition-all duration-300 ${
              activeFilter === source
                ? "bg-[#FF00FF] border-[#00FFF0] text-black shadow-[0_0_15px_#00FFF0]"
                : "border-[#FF00FF] text-[#FF00FF] hover:bg-[#FF00FF] hover:text-[#00FFF0]"
            }`}
          >
            {getIcon(source, "text-lg")}
            {source}
          </motion.button>
        ))}
      </div>

      {/* Feed Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-[#111] border border-[#00FFF0]/30 rounded-2xl p-5 shadow-[0_0_15px_#00FFF0] hover:shadow-[0_0_30px_#FF00FF] transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getIcon(post.source)}
                  <span className="font-semibold text-[#FF00FF]">{post.source}</span>
                </div>
                <span className="text-gray-400 text-sm">
                  {new Date(post.created_at).toLocaleTimeString()}
                </span>
              </div>

              <h2 className="text-lg font-semibold mb-2 text-[#00FFF0]">{post.title}</h2>
              <p className="text-gray-400 text-sm mb-3">by {post.author}</p>

              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF00FF] text-sm hover:underline"
              >
                View full post →
              </a>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            No posts found for {activeFilter}.
          </p>
        )}
      </div>
    </section>
  );
}
