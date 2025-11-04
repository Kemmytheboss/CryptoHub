"use client";
import React from "react";

export default function OrderHistory({ orders }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl">
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
  );
}
