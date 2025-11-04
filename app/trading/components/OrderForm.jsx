'use client';
import { useState} from "react";

export default function OrderForm({ onTradeExecute }) {
    const [symbol, setSymbol] = useState("");
    const [quantity, setQuantity] = useState("");
    const [tradeType, setTradeType] = useState("buy");  
    const [price, setPrice] = useState("");
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tradeData = { symbol, quantity: parseFloat(quantity), tradeType, price: parseFloat(price) };
        try {
            const res = await fetch('/api/trade', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tradeData),
            });
            const result = await res.json();
            setResponse(result);
            onTradeExecute(result);  
        } catch (error) {
            console.error("Error executing trade:", error);
            setResponse({ error: "Failed to execute trade." });
        }
    };

    return (
        <div className="p-6 bg-white/5 rounded-xl max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Execute Trade</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Symbol</label>
                    <input
                        type="text"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                        className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                        placeholder="e.g., BTCUSDT"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Quantity</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                        placeholder="e.g., 0.01"
                        step="any"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Trade Type</label>
                    <select
                        value={tradeType}
                        onChange={(e) => setTradeType(e.target.value)}
                        className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                    >
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1">Price (USD)</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                        placeholder="e.g., 30000.00"
                        step="any"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
                >
                    Execute Trade
                </button>
            </form>
            {response && (
                <div className="mt-4 p-4 bg-gray-800 rounded-lg text-white">
                    {response.error ? (
                        <p className="text-red-400">Error: {response.error}</p>
                    ) : (
                        <div>
                            <p>Trade Executed Successfully!</p>
                            <p>Symbol: {response.symbol}</p>
                            <p>Quantity: {response.quantity}</p>
                            <p>Trade Type: {response.tradeType}</p>
                            <p>Price: ${response.price}</p>
                            <p>Timestamp: {new Date(response.timestamp).toLocaleString()}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}       