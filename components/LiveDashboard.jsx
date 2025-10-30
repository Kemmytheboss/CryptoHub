"use client";
import React, { useEffect, useState } from "react";

export default function LiveDashboard() {
  const [coins, setCoins] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch top 20 coins from CoinGecko
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/coins");
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        console.error("Failed to fetch coins:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Load favorites from localStorage
    const interval = setInterval(fetchData, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) 
    return <p>Loading live data...</p>;

 return (
    <section className="p-6 bg-gray-900 rounded-2xl shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Top 20 Cryptocurrencies</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-200">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Price (USD)</th>
              <th className="py-2 px-4 text-left">24h Change</th>
              <th className="py-2 px-4 text-left">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => (
              <tr key={coin.id} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4 font-medium">{coin.name}</td>
                <td className="py-2 px-4">${coin.quote.USD.price.toFixed(2)}</td>
                <td
                  className={`py-2 px-4 ${
                    coin.quote.USD.percent_change_24h > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {coin.quote.USD.percent_change_24h.toFixed(2)}%
                </td>
                <td className="py-2 px-4">${coin.quote.USD.market_cap.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}