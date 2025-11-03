'use client';
import React, { useState, useEffect } from "react";
import Predictions from "../trading/components/PredictionCard";

export default function TradingChart() {
    const container = useRef();

    useEffect(() => {
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
        container.current.appendchild(script);
        return () => container.current.innerHTML= "";
    }, [symbol]);

    return (
        <div ref={container} className="tradingview-chart-container" style={{ height: "500px" }}></div>
    );
}