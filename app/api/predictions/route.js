export async function GET() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
  );
  const data = await res.json();
  const predictions = data.map((coin) => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    current_price: coin.current_price,
    price_change_percentage_24h: coin.price_change_percentage_24h,
    trend: coin.price_change_percentage_24h > 0 ? "bullish 📈" : "bearish 📉",
  }));
  return new Response(JSON.stringify(predictions), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
