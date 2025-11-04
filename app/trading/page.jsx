"use client";
import React, { useState, useEffect } from "react";
import SymbolSelector from "./components/SymbolSelector";
import ChartWidget from "./components/ChartWidget";
import OrderForm from "./components/OrderForm";
import OrderHistory from "./components/OrderHistory";
import PredictionPanel from "./components/PredictionPanel";

export default function TradingPlatform() {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState("");
  const [orders, setOrders] = useState([]);

  const coins = ["BTCUSDT", "TRXUSDT", "DOGEUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT"];

  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${symbol
            .replace("USDT", "")
            .toLowerCase()}&vs_currencies=usd`
        );
        const data = await res.json();
        const priceValue =
          data[symbol.replace("USDT", "").toLowerCase()]?.usd;
        if (priceValue) setPrice(priceValue);
      } catch (error) {
        console.error("Price fetch failed:", error);
      }
    }

    fetchPrice();
    const interval = setInterval(fetchPrice, 15000);
    return () => clearInterval(interval);
  }, [symbol]);

  const handleOrder = (type) => {
    if (!amount) return alert("Enter an amount first.");
    const total = (price * parseFloat(amount)).toFixed(2);
    const newOrder = {
      id: Date.now(),
      type,
      symbol,
      amount,
      price,
      total,
      time: new Date().toLocaleTimeString(),
    };
    setOrders([newOrder, ...orders]);
    setAmount("");
  };

  return (
    <section className="p-6 bg-gray-900 text-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Trading Terminal</h2>
      <SymbolSelector symbol={symbol} setSymbol={setSymbol} coins={coins} />
      <div className="text-center mb-6">
        <p className="text-lg text-gray-300">
          Live Price:{" "}
          <span className="text-[#00FFF0] font-semibold">${price}</span>
        </p>
      </div>

      <PredictionPanel symbol={symbol} />
      <ChartWidget symbol={symbol} />

      <div className="grid md:grid-cols-3 gap-6">
        <OrderForm amount={amount} setAmount={setAmount} handleOrder={handleOrder} />
        <OrderHistory orders={orders} />
      </div>
    </section>
  );
}
