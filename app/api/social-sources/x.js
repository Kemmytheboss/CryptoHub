export async function getTwitterPosts() {
  try {
    const res = await fetch(
      "https://api.twitter.com/2/tweets/search/recent?query=crypto&max_results=5",
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      }
    );
    const data = await res.json();

    if (!data.data) return [];

    return data.data.map((tweet) => ({
      platform: "Twitter",
      title: tweet.text,
      author: tweet.author_id,
      url: `https://twitter.com/i/web/status/${tweet.id}`,
      date: tweet.created_at,
    }));
  } catch (err) {
    console.error("Twitter fetch error:", err);
    return [];
  }
}
