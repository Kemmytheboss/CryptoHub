"use client";
import React, {useState, useEffect} from "react";

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);

    useEffect (()=> {
        setOrders([
            { id: 1, symbol: "BTCUSDT", side: "BUY", price: "65000", quantity: "0.001", status: "FILLED" },
            { id: 2, symbol: "ETHUSDT", side: "SELL", price: "3200", quantity: "0.05", status: "PENDING" },
        ]);
    }, []);
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 text-[#00c0ff]">Order History</h2>
            <table className="w-full text-sm bg-gray-900/40 rounded-xl overflow-hidden">
                <thead className="bg-[#00e0ff]/10 text-[#00e0ff]">
                    <tr>
                        <th className="p-3 text-left">Symbol</th>
                        <th className="p-3 text-left">Side</th>
                        <th className="p-3 text-left">Price</th>
                        <th className="p-3 text-left">Quantity</th>
                        <th className="p-3 text-left">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((o)=> (
                        <tr key={o.id} className="border-b border-gray-700">
                            <td className="p-3">{o.Reactsymbol}</td>
                            <td className={`p-3 ${o.side === "BUY" ? "text-green-400" : "text-red-400"}`}>{o.side}</td>
                            <td className="p-3">{o.price}</td>
                            <td className="p-3">{o.quantity}</td>
                            <td className="p-3 text-gray-300">{o.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  );
}