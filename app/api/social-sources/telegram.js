// app/api/social-sources/telegram.js

export async function getTelegramPosts() {
  try {
    // This is a placeholder public test channel (or simulate posts)
    const res = await fetch(
      "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates"
    );

    const data = await res.json();

    // ✅ Guard against unexpected responses
    if (!data || !Array.isArray(data.result)) {
      console.warn("Telegram returned unexpected data:", data);
      return [
        {
          platform: "Telegram",
          title: "No recent Telegram updates available.",
          author: "System",
          url: "https://t.me/crypto",
          date: new Date().toISOString(),
        },
      ];
    }

    return data.result.map((msg) => ({
      platform: "Telegram",
      title: msg.message?.text?.slice(0, 100) || "New Telegram message",
      author: msg.message?.from?.username || "Unknown",
      url: `https://t.me/${msg.message?.chat?.username || "crypto"}`,
      date: new Date(msg.message?.date * 1000).toISOString(),
    }));
  } catch (err) {
    console.error("Telegram fetch error:", err);
    return [
      {
        platform: "Telegram",
        title: "Unable to fetch Telegram posts right now.",
        author: "System",
        url: "https://t.me/crypto",
        date: new Date().toISOString(),
      },
    ];
  }
}
