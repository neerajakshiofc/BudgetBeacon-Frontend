import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const topIndianStocks = [
  { label: 'TCS', value: 'TCS.NS' },
  { label: 'Infosys', value: 'INFY.NS' },
  { label: 'Reliance', value: 'RELIANCE.NS' },
  { label: 'HDFC Bank', value: 'HDFCBANK.NS' },
  { label: 'ICICI Bank', value: 'ICICIBANK.NS' },
];

const LiveStocks = () => {
  const [symbol, setSymbol] = useState('');
  const [stock, setStock] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchStock = async () => {
    if (!symbol) return;

    setLoading(true);
    setError('');
    setStock(null);
    setChartData(null);

    try {
      const res = await axios.get('https://budget-beacon-backend-2.onrender.com/api/stock-suggestions', {
        params: { symbol },
      });

      const stockInfo = res.data;
      setStock(stockInfo);

      // Assuming res.data.history = [{ date: '2024-04-17', price: 3400 }, ...]
      if (stockInfo.history) {
        const labels = stockInfo.history.map((point) => point.date);
        const prices = stockInfo.history.map((point) => point.price);

        setChartData({
          labels,
          datasets: [
            {
              label: `${stockInfo.symbol} Price Trend`,
              data: prices,
              fill: true,
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
              borderColor: '#facc15', // yellow-500
              tension: 0.4,
            },
          ],
        });
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch stock data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">📈 Live Stock Price</h2>

      <select
        className="p-2 border border-gray-300 rounded w-full mb-2"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      >
        <option value="">Select a Stock</option>
        {topIndianStocks.map((stock) => (
          <option key={stock.value} value={stock.value}>
            {stock.label}
          </option>
        ))}
      </select>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Or enter symbol (e.g., TCS.NS)"
          className="p-2 border border-gray-300 rounded w-full"
        />
        <button
          onClick={fetchStock}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Get Stock
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {stock && (
        <div className="bg-white p-4 border rounded shadow mb-4">
          <h3 className="text-lg font-semibold">{stock.symbol}</h3>
          <p className="text-gray-700">Latest Price: ₹{stock.latestPrice}</p>
          <p
            className={`text-sm ${
              stock.change && stock.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            Change: {stock.change?.toFixed(2)}%
          </p>
        </div>
      )}

      {chartData && (
        <div className="bg-white p-4 border rounded shadow">
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default LiveStocks;
