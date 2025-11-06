export async function getTelegramPosts() {
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getUpdates`
    );
    const data = await res.json();

    return data.result.map((msg) => ({
      platform: "Telegram",
      title: msg.message.text?.slice(0, 100) || "New message",
      author: msg.message.from?.username || "Unknown",
      date: new Date(msg.message.date * 1000).toISOString(),
      url: `https://t.me/${msg.message.chat?.username || "crypto"}`,
    }));
  } catch (err) {
    console.error("Telegram fetch error:", err);
    return [];
  }
}
