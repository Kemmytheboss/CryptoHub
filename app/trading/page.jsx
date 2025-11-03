'use client';
import TradingChart from "../..components/TradingChart";
import TradeForm from "../../components/TradeForm";
import orderHistory from "../../components/OrderHistory";

export default function TradingPage() {
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