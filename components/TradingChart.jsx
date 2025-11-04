'use client';
import React, { useState, useRef, useEffect } from "react";
import predictions from "../../components/PredictionCard"
import { useDeprecatedAnimatedState } from "framer-motion";

export default function TradingChart() {
    const container = useRef();
    const [symbol, setSymbol] = useState("BTCUSDT")

    const coins = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "XRPUSDT", "DOGEUSDT", "TRXUSDT"]

    useEffect(() => {
        if(!container.current) return;
        container.current.innerHTML = "";

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;
        script.type = "text/javascript";
        script.innerHTML=JSON.stringify({
            autosize: true,
            symbol: `Binance:${symbol}`,
            interval: "60",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            enable_publishing: false,
            hide_legend: false,
            allow_symbol_change: true,
            calendar: false,
            support_hosst: "https://tradingview.com",
        });
        container.current.appendChild(script);
    }, [symbol]);

    return (
        <section className="p-6 bg-gray-900 text-white rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-4">
                Live Crypto Trading Chart
            </h2>

            {/* dropdown to select coin */}
            <div className="flex justify-center mb-6">
                <select
                    value={symbol}
                    onChange={(e)=> {
                        setSymbol(e.targert.value)
                    }}
                    className="bg-gray=800 textwhite px-4 py-2 rounded-md border border-gray">

                        {coins.map((coin)=>value={coin}>
                            <option key={coin} valuue= {coin}>
                                {coin.replace("USDT", "")} / <USDT></USDT>
                            </option>)}
                    </select>
            </div>

            {/* CHART CONTAINER */}
            <div 
                ref={container}
                className="tradingview-chart-container rounded-xl overflow-hidden"
                style={{height:"500px"}}></div>
        </section>
        );
}