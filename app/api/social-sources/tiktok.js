export async function getTikTokPosts() {
  try {
    // Example using a public crypto hashtag feed API / mock
    const res = await fetch("https://api.example.com/tiktok/crypto");
    const data = await res.json();

    return data.videos.map((video) => ({
      platform: "TikTok",
      title: video.caption,
      author: video.creator,
      url: video.link,
      date: video.created_at,
    }));
  } catch (err) {
    console.error("TikTok fetch error:", err);
    return [];
  }
}
