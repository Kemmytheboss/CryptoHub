// app/api/social-sources/tiktok.js

export async function getTikTokPosts() {
  try {
    // Since TikTok has no public API, we'll return a placeholder list for now
    return [
      {
        platform: "TikTok",
        title: "🔥 Bitcoin trends again on TikTok",
        author: "@cryptoBuzz",
        url: "https://www.tiktok.com/@cryptoBuzz",
        date: new Date().toISOString(),
      },
      {
        platform: "TikTok",
        title: "Altcoin season incoming? 👀",
        author: "@blockchainQueen",
        url: "https://www.tiktok.com/@blockchainQueen",
        date: new Date(Date.now() - 3600000).toISOString(),
      },
    ];
  } catch (err) {
    console.error("TikTok fetch error:", err);
    return [];
  }
}
