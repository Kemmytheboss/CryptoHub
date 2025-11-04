'use client';
import React, {useState, useRef, useEffect} from "react";

export default function TradingPlatform() {
  const container = useRef();

  const [symbol,setSymbol] = useState ("BTCUSDT");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState ("")
  const [orders, setOrders] = useState([]);
  const [prediction, setPrediction] = useState(null);

  const coins = ["BTCUSDT", "TRXUSDT", "DOGEUSDT", "BNBUSDT", "SOLUSDT","XRPUSDT" ];

  useEffect (()=>{
    if(!container.current) return;
    container.current.innerHTML = "";
    setPrediction(getAIPrediction(symbol));


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

    // to place order (mock)

    const handleOrder=(type) => {
      if (!amount) return alert("Enter an amount first.");
      const total = (price * parseFloat(amount).toFixed(2));
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
      alert(`${type} order placed for ${amount} ${symbol} at $${price}`);

    };
    function getAIPrediction(symbol) {
      const signals = ["STRONG BUY", "BUY", "HOLD", "SELL", "STRONG SELL"];
      const randomSignal = signals[Math.floor(Math.random() * signals.length)];
      const confidence = (Math.random() * (100 - 60) + 60).toFixed(1); // 60–100%

  return {
    symbol,
    signal: randomSignal,
    confidence,
    timestamp: new Date().toLocaleTimeString(),
  };
}
useEffect(() => {
  // Generate initial prediction
  setPrediction(getAIPrediction(symbol));

  // Update every 30 seconds
  const interval = setInterval(() => {
    setPrediction(getAIPrediction(symbol));
  }, 30000);

  return () => clearInterval(interval);
}, [symbol]);


   return (
    <section className="p-6 bg-gray-900 text-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Trading Terminal</h2>

      {/* Symbol Dropdown */}
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

      {/* Live Price */}
      <div className="text-center mb-6">
        <p className="text-lg text-gray-300">
          Live Price:{" "}
          <span className="text-[#00FFF0] font-semibold">${price || "Loading..."}</span>
        </p>
      </div>

       {/* Chart + AI Predictions */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div ref={container} className="md:col-span-2 tradingview-chart-container rounded-xl overflow-hidden" style={{ height: "500px" }}></div>

        <div className="bg-gray-800 p-6 rounded-xl text-center flex flex-col justify-center">
          <h3 className="text-2xl font-semibold mb-4">AI Market Prediction</h3>
          {prediction ? (
            <>
              <p className="text-lg text-gray-300">Symbol: <span className="font-bold">{prediction.symbol}</span></p>
              <p className={`text-3xl font-bold mt-2 ${
                prediction.signal.includes("BUY") ? "text-green-400" :
                prediction.signal.includes("SELL") ? "text-red-400" : "text-yellow-400"
              }`}>
                {prediction.signal}
              </p>
              <p className="text-gray-400 mt-2">Confidence: {prediction.confidence}%</p>
              <p className="text-gray-500 text-sm mt-2">Updated: {prediction.timestamp}</p>
            </>
          ) : (
            <p className="text-gray-500">Generating AI prediction...</p>
          )}
        </div>
      </div>


      {/* Order Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Buy/Sell Form */}
        <div className="md:col-span-1 bg-gray-800 p-6 rounded-xl">
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

        {/* Orders History */}
        <div className="md:col-span-2 bg-gray-800 p-6 rounded-xl">
          <h3 className="text-2xl font-semibold mb-4 text-center">Order History</h3>
          {orders.length === 0 ? (
            <p className="text-gray-400 text-center">No orders yet.</p>
          ) : (
            <table className="w-full text-sm text-gray-300">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="py-2">Type</th>
                  <th>Symbol</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-700">
                    <td
                      className={`py-2 font-bold ${
                        order.type === "BUY" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {order.type}
                    </td>
                    <td>{order.symbol}</td>
                    <td>{order.amount}</td>
                    <td>${order.price}</td>
                    <td>${order.total}</td>
                    <td>{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
