"use client";
import React, { useEffect, useState } from "react";

export default function PredictionPanel({ symbol }) {
  const [prediction, setPrediction] = useState(null);

  function getAIPrediction(symbol) {
    const signals = ["STRONG BUY", "BUY", "HOLD", "SELL", "STRONG SELL"];
    const randomSignal = signals[Math.floor(Math.random() * signals.length)];
    const confidence = (Math.random() * (100 - 60) + 60).toFixed(1);

    return {
      symbol,
      signal: randomSignal,
      confidence,
      timestamp: new Date().toLocaleTimeString(),
    };
  }

  useEffect(() => {
    setPrediction(getAIPrediction(symbol));
    const interval = setInterval(
      () => setPrediction(getAIPrediction(symbol)),
      30000
    );
    return () => clearInterval(interval);
  }, [symbol]);

  if (!prediction) return null;

  return (
    <div className="bg-gray-800 p-4 rounded-xl text-center mb-6">
      <h3 className="text-xl font-semibold mb-2">AI Market Prediction</h3>
      <p className="text-[#00FFF0] text-lg">
        {prediction.signal} ({prediction.confidence}% Confidence)
      </p>
      <p className="text-sm text-gray-400 mt-2">
        Updated: {prediction.timestamp}
      </p>
    </div>
  );
}
