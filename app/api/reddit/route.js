export async function GET() {
  try {
    const res = await fetch(
            "https://www.reddit.com/r/cryptocurrency+bitcoin+CryptoMarkets+ethtrader/hot.json?limit=20",
      { next: { revalidate: 60 } } // cache for 60s
    );

    if (!res.ok) throw new Error("Failed to fetch Reddit posts");

    const data = await res.json();

    const posts = data.data.children.map((child) => ({
      id: child.data.id,
      title: child.data.title,
      author: child.data.author,
      url: `https://reddit.com${child.data.permalink}`,
      ups: child.data.ups,
      comments: child.data.num_comments,
      created: new Date(child.data.created_utc * 1000).toLocaleString(),
      subreddit: child.data.subreddit,
      thumbnail:
        child.data.thumbnail && child.data.thumbnail.startsWith("http")
          ? child.data.thumbnail
          : null,
    }));

    return Response.json({ success: true, posts});
  } catch (error) {
    console.error("Reddit API Error:", error);
    return Response.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
