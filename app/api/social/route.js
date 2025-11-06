import { NextResponse } from "next/server";
import { getRedditPosts } from "../social-sources/reddit";
import { getTwitterPosts } from "../social-sources/twitter";
import { getTikTokPosts } from "../social-sources/tiktok";
import { getTelegramPosts } from "../social-sources/telegram";

export async function GET() {
  try {
    const [reddit, twitter, tiktok, telegram] = await Promise.all([
      getRedditPosts(),
      getTwitterPosts(),
      getTikTokPosts(),
      getTelegramPosts(),
    ]);

    const combinedFeed = [
      ...reddit,
      ...twitter,
      ...tiktok,
      ...telegram,
    ].sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by latest

    return NextResponse.json({
      success: true,
      count: combinedFeed.length,
      data: combinedFeed,
    });
  } catch (error) {
    console.error("❌ Error fetching social feeds:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
