export async function getRedditPosts() {
  try {
    const res = await fetch("https://www.reddit.com/r/cryptocurrency/hot.json?limit=5");
    const data = await res.json();

    return data.data.children.map((post) => ({
      platform: "Reddit",
      title: post.data.title,
      author: post.data.author,
      url: `https://reddit.com${post.data.permalink}`,
      date: new Date(post.data.created_utc * 1000).toISOString(),
      score: post.data.score,
    }));
  } catch (err) {
    console.error("Reddit fetch error:", err);
    return [];
  }
}
