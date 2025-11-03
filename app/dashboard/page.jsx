"use client";
import React from "react";
import LiveDashboard from "../trading/components/LiveDashboard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Live Crypto Dashboard</h1>
        <p className="text-lg text-gray-400">
          Real-time prices and market data for top cryptocurrencies
        </p>
      </header>
      <main>
        <LiveDashboard />
      </main>
    </div>
  );
}