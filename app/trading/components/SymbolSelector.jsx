"use client";
import React from "react";

export default function SymbolSelector({ symbol, setSymbol, coins }) {
  return (
    <div className="flex justify-center mb-6">
      <select
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring focus:ring-blue-400"
      >
        {coins.map((coin) => (
          <option key={coin} value={coin}>
            {coin.replace("USDT", "")} / USDT
          </option>
        ))}
      </select>
    </div>
  );
}
