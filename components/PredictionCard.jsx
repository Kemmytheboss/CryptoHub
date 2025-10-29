import React from "react";

export default function PredictionCard({ coins }) {
  if (!coins.length) return <p>Loading predictions...</p>;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {coins.slice(0, 3).map((coin) => {
        // Simple prediction logic example
        const trend =
          coin.price_change_percentage_24h > 0 ? "bullish 📈" : "bearish 📉";
        return (
          <div
            key={coin.id}
            className="p-4 bg-gray-800 rounded-lg border border-gray-700"
          >
            <h4 className="text-lg font-semibold">{coin.name}</h4>
            <p className="text-sm text-gray-400">
              24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
            <p className="text-green-400 mt-2">
              Prediction: Market looks {trend}
            </p>
          </div>
        );
      })}
    </div>
  );
}
