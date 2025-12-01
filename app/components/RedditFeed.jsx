"use client";
import { useEffect, useState } from "react";

export default function RedditFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/reddit");
      const data = await res.json();
      setPosts(data);
    }
    load();
  }, []);

  return (
    <section className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">🔥 Trending on Reddit</h2>

      <div className="space-y-4">
        {posts.length === 0 && <p>Loading Reddit posts...</p>}

        {posts.map((post) => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            className="block p-4 border rounded-lg hover:bg-gray-50 transition"
          >
            <h3 className="font-semibold text-lg">{post.title}</h3>
            <p className="text-sm text-gray-500">
              r/{post.subreddit} • {post.ups} upvotes • {post.comments} comments
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
