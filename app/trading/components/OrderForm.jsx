"use client";
import React from "react";

export default function OrderForm({ amount, setAmount, handleOrder }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <h3 className="text-2xl font-semibold mb-4 text-center">Trade</h3>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-700 text-white rounded-md focus:ring focus:ring-blue-400"
      />
      <div className="flex gap-4">
        <button
          onClick={() => handleOrder("BUY")}
          className="flex-1 py-2 bg-green-600 hover:bg-green-700 rounded-md transition-all"
        >
          BUY
        </button>
        <button
          onClick={() => handleOrder("SELL")}
          className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-all"
        >
          SELL
        </button>
      </div>
    </div>
  );
}
