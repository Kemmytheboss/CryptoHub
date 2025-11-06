// /app/api/social/route.js
import { NextResponse } from "next/server";

// Example helper to format data consistently
function formatPost(source, title, link, created_at, author, extra = {}) {
  return { source, title, link, created_at, author, ...extra };
}

export async function GET() {
  try {
    // --- 1️⃣ Fetch Reddit posts ---
    const redditRes = await fetch(
      "https://www.reddit.com/r/CryptoCurrency/top.json?limit=10"
    );
    const redditData = await redditRes.json();
    const redditPosts = redditData.data.children.map((post) =>
      formatPost(
        "Reddit",
        post.data.title,
        `https://reddit.com${post.data.permalink}`,
        post.data.created_utc * 1000,
        post.data.author
      )
    );

    // --- 2️⃣ Twitter (Placeholder or your future API integration) ---
    const twitterPosts = [
      formatPost(
        "Twitter",
        "Bitcoin hits new highs as ETF speculation grows 🚀",
        "https://twitter.com/cryptonews/status/12345",
        Date.now() - 1000 * 60 * 20,
        "@CryptoNews"
      ),
      formatPost(
        "Twitter",
        "Solana surges 15% in 24h — what’s driving the rally?",
        "https://twitter.com/defi_insider/status/67890",
        Date.now() - 1000 * 60 * 45,
        "@DeFi_Insider"
      ),
    ];

    // --- 3️⃣ TikTok (Placeholder) ---
    const tiktokPosts = [
      formatPost(
        "TikTok",
        "Altcoin season is HERE! #crypto #tradingtips",
        "https://www.tiktok.com/@cryptoguru/video/1234567890",
        Date.now() - 1000 * 60 * 60,
        "@CryptoGuru"
      ),
    ];

    // --- 4️⃣ Telegram (Placeholder) ---
    const telegramPosts = [
      formatPost(
        "Telegram",
        "🔥 Binance Launchpad alert: new project incoming!",
        "https://t.me/cryptoupdates",
        Date.now() - 1000 * 60 * 120,
        "Crypto Updates Channel"
      ),
    ];

    // --- 5️⃣ Combine all sources ---
    const allPosts = [...redditPosts, ...twitterPosts, ...tiktokPosts, ...telegramPosts];

    // --- 6️⃣ Sort newest → oldest ---
    allPosts.sort((a, b) => b.created_at - a.created_at);

    return NextResponse.json({ success: true, count: allPosts.length, data: allPosts });
  } catch (error) {
    console.error("Error fetching social data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch social feeds" },
      { status: 500 }
    );
  }
}
