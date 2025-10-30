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
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
        );
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
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  // ⭐ Handle favorites toggle
  function toggleFavorite(coin) {
    const exists = favorites.find((f) => f.id === coin.id);
    let updated;
    if (exists) {
      updated = favorites.filter((f) => f.id !== coin.id);
    } else {
      updated = [...favorites, coin];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  }

  if (loading) {
    return (
      <div className="text-center text-gray-400 p-8">Loading live data...</div>
    );
  }

  return (
    <section className="p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">
        📊 Live Dashboard — Top 20 Coins
      </h2>

      {/* === Live Data Section === */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="p-4 bg-gray-800 rounded-lg flex justify-between items-center hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-3">
              <img
                src={coin.image}
                alt={coin.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">{coin.name}</h3>
                <p className="text-sm text-gray-400">
                  ${coin.current_price.toLocaleString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleFavorite(coin)}
              className={`px-3 py-1 rounded-lg text-lg ${
                favorites.some((f) => f.id === coin.id)
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-700"
              }`}
            >
              ⭐
            </button>
          </div>
        ))}
      </div>

      {/* === Predictions Section === */}
      <h3 className="text-2xl font-semibold mb-4">🔮 Market Predictions</h3>
      <PredictionCard coins={coins} />

      {/* === Favorites Section === */}
      <h3 className="text-2xl font-semibold mt-10 mb-4">⭐ Your Favorites</h3>
      <FavoritesList favorites={favorites} />
    </section>
  );
}
