'use client';

import React, { useEffect, useState } from "react";

export default function FavoritesList({ favorites }) {
  const [liveFavorites, setLiveFavorites] = useState([]);

  // Fetch updated coin data for favorites
  useEffect(() => {
    const fetchLiveData = async () => {
      if (!favorites.length) return;

      const ids = favorites.map(f => f.id).join(",");
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=false`
      );
      const data = await res.json();
      setLiveFavorites(data);
    };

    fetchLiveData();

    // Refresh every 60s
    const interval = setInterval(fetchLiveData, 60000);
    return () => clearInterval(interval);
  }, [favorites]);

  if (!favorites.length) return <p className="text-gray-400">No favorites yet.</p>;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {liveFavorites.map((coin) => (
        <div
          key={coin.id}
          className="p-4 bg-gray-800 rounded-lg flex justify-between items-center"
        >
          <div>
            <h4 className="text-lg font-semibold">{coin.name}</h4>
            <p className="text-sm text-gray-400">${coin.current_price}</p>
            <p className={`mt-1 ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
              24h: {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
