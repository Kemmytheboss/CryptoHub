"use client";

import React, { useState, useEffect } from "react";

export default function LiveDashboard() {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
      const data = await res.json();
      setPrices(data.bpi);
    };
    fetchData();
  }, []);

  return (
    <section className="p-8 text-center">
      <h2 className="text-3xl font-semibold mb-6">Live Crypto Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.keys(prices).map((key) => (
          <div key={key} className="bg-white/10 p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-bold">{key}</h3>
            <p>{prices[key].rate}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
