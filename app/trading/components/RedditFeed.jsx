"use client";

import React, { useEffect, useState } from "react";

export default function RedditFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReddit() {
      try {
        const res = await fetch("/api/reddit");
        const data = await res.json();
        setPosts(data.posts || []); // handle { posts: [...] } structure
      } catch (err) {
        console.error("Error fetching Reddit posts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchReddit();

    // refresh every minute automatically
    const interval = setInterval(fetchReddit, 6000);
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-400">Loading Reddit crypto posts...</p>
    );

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex flex-col bg-gray-900/70 border border-gray-700 rounded-xl p-4 shadow-md hover:shadow-lg hover:bg-gray-800 transition-all"
        >
          {/* Thumbnail if available */}
          {post.thumbnail && (
            <img
              src={post.thumbnail}
              alt="Reddit thumbnail"
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
          )}

          {/* Post Title */}
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-blue-400 hover:underline"
          >
            {post.title}
          </a>

          {/* Meta Info */}
          <div className="text-sm text-gray-400 mt-2">
            Posted by <span className="text-gray-300">u/{post.author}</span> in{" "}
            <span className="text-gray-300">r/{post.subreddit}</span>
          </div>

          {/* Upvotes & Comments */}
          <div className="flex justify-between items-center mt-3 text-sm">
            <span className="bg-green-700/40 px-3 py-1 rounded-full text-green-300">
              ⬆️ {post.ups} upvotes
            </span>
            <span className="bg-blue-700/40 px-3 py-1 rounded-full text-blue-300">
              💬 {post.comments} comments
            </span>
          </div>

          {/* Read Button */}
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Read on Reddit →
          </a>
        </div>
      ))}
    </div>
  );
}
