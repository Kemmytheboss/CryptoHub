'use client';

import React, { useState, useEffect } from "react";
import FavoritesList from "./FavoritesList";

export default function Predictions() {
  const [coins, setCoins] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const fetchCoins = async () => {
    try {
      const res = await fetch("/api/predictions");
      const data = await res.json();
      setCoins(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
    fetchCoins();

    const interval = setInterval(fetchCoins, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleFavorite = (coin) => {
    let updatedFavorites;
    const exists = favorites.find((f) => f.id === coin.id);

    if (exists) {
      updatedFavorites = favorites.filter((f) => f.id !== coin.id);
    } else {
      updatedFavorites = [...favorites, coin];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  if (!coins.length) return <p>Loading predictions...</p>;

  return (
    <div className="space-y-10">
      {/* Predictions */}
      <div className="grid md:grid-cols-2 gap-4">
        {coins.slice(0, 3).map((coin) => {
          const trend = coin.price_change_percentage_24h > 0 ? "bullish 📈" : "bearish 📉";
          const isFavorite = favorites.find(f => f.id === coin.id);

          return (
            <div
              key={coin.id}
              className="p-4 bg-gray-800 rounded-lg border border-gray-700 flex flex-col justify-between"
            >
              <div>
                <h4 className="text-lg font-semibold">{coin.name}</h4>
                <p className="text-sm text-gray-400">
                  24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
                <p className={`mt-2 ${trend.includes('bullish') ? 'text-green-400' : 'text-red-400'}`}>
                  Prediction: Market looks {trend}
                </p>
              </div>

              <button
                onClick={() => toggleFavorite(coin)}
                className={`mt-4 px-4 py-2 rounded-full font-semibold transition 
                  ${isFavorite 
                    ? 'bg-yellow-400 text-black hover:bg-yellow-300' 
                    : 'bg-gray-700 text-white hover:bg-gray-600'}`}
              >
                {isFavorite ? "★ Favorited" : "☆ Add to Watchlist"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Watchlist Header + Clear Button */}
      <div className="flex items-center justify-between mt-10 mb-4">
        <h3 className="text-2xl font-bold text-white">Your Watchlist</h3>
        {favorites.length > 0 && (
          <button
            onClick={clearFavorites}
            className="px-4 py-2 rounded-full font-semibold bg-[#FF00FF] text-black hover:bg-transparent hover:text-[#FF00FF] hover:shadow-[0_0_25px_#FF00FF] transition-all duration-300"
          >
            Clear Watchlist
          </button>
        )}
      </div>

      {/* Favorites List */}
      <FavoritesList favorites={favorites} />
    </div>
  );
}
