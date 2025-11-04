'use client';
import { clear } from "console";
import React, {useState, useRef, useEffect} from "react";
import { getEffectiveConstraintOfTypeParameter } from "typescript";

export default function TradingPlatform() {
  const container = useRef;

  const [symbol,setSymbol] = useState ("BTCUSDT");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState ("")
  const [orders, setOrders] = useState([]);

  const coins = ["BTCUSDT", "TRXUSDT", "DOGEUSDT", "BNBUSDT", "SOLUSDT","XRPUSDT" ];

  useEffect (()=>{
    if(!container.current) return;
    container.current.innerHTML = "";

    const script = document.createElement('script');
    script.src = 
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `BINANCE:${symbol}`,
      interval: "60",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      hide_legend: false,
      allow_symbol_change: true,
      calendar: false,
      support_host: "https://www.tradingview.com",
  });
  container.current.appendChild(script);
},[symbol]);

useEffect(()=> {
  async function fetchPrice () {
    try {
      const res= await fetch (
        `https://api.coingecko.com/api/v3/simple/price?ids=${symbol
            .replace("USDT", "")
            .toLowerCase()}&vs_currencies=usd`
      );
      const data = await res.json();
      const priceValue = data[symbol.replace("USDT", "").toLowerCase()] ?.usd;
      if(priceValue) setPrice(priceValue);
    } catch (error) {
      console.error("Price fetch failed, error");
    }
  }
    fetchPrice();
    const interval= setInterval(fetchPrice, 15000);
    return () => clearInterval(interval);
  }, [symbol]);
  
   return (
    <section className="trading-page">
      <div className="trading-chart-section">
        <h1 classname="text-2xl font-bold mb-4">Trading Chart</h1>

        <div className="chart-container">
            <div className="chart-wrapper">
                <TradingChart symbol="BTCUSDT" />
                </div>

                <div className="trade-form-wrapper">
                    <TradeForm />
                </div>
            </div>

            <div className="order-history-section mt-8">
                <h2 className="text-xl font-bold mb-4">Order History</h2>
                <OrderHistory />    
            </div>
        </div>
      </section>
  );
}   