import React from "react";

export default function FavoritesList({ favorites }) {
  if (!favorites.length)
    return <p className="text-gray-400">No favorites yet.</p>;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {favorites.map((coin) => (
        <div
          key={coin.id}
          className="p-4 bg-gray-800 rounded-lg flex justify-between items-center"
        >
          <div>
            <h4 className="text-lg font-semibold">{coin.name}</h4>
            <p className="text-sm text-gray-400">${coin.current_price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
