import React, { useState } from 'react';
import axios from 'axios';

const StockSuggestions = () => {
  const [symbol, setSymbol] = useState('');
  const [stock, setStock] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchStock = async () => {
    if (!symbol) return;

    setLoading(true);
    setError('');
    setStock(null);

    try {
      const res = await axios.get('https://budget-beacon-backend-2.onrender.com/api/stock-suggestions', {
        params: { symbol },
      });

      setStock(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch stock data. Please check the symbol.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">📈 Stock Suggestions</h2>
      <p className="text-gray-600 mb-4">
        Get real-time stock suggestions and analysis based on your input. This is perfect for beginners who want to explore and understand stocks before investing.
      </p>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-3 rounded mb-4 text-sm">
        💡 Tip: Try entering symbols like <code>TCS.NS</code>, <code>INFY.NS</code>, <code>RELIANCE.NS</code> (for Indian stocks) or <code>AAPL</code>, <code>GOOGL</code>, <code>TSLA</code> (for US stocks).
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter stock symbol (e.g., TCS.NS, AAPL)"
          className="p-2 border border-gray-300 rounded w-full"
        />
        <button
          onClick={fetchStock}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Get Stock
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading stock data...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {stock && (
        <div className="bg-white p-5 border rounded shadow-md">
          <h3 className="text-lg font-semibold mb-1">
            {stock.name} ({stock.symbol})
          </h3>
          <p className="text-gray-700">Current Price: ₹{stock.latestPrice} {stock.currency}</p>
          <p
            className={`text-sm mb-1 ${
              stock.change && stock.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            Change: {stock.change?.toFixed(2)}%
          </p>
          <div className="text-sm text-gray-600 space-y-1 mt-2">
  <p>📊 <strong>Day High:</strong> {stock.dayHigh ? `₹${stock.dayHigh}` : 'Not available'}</p>
  <p>📉 <strong>Day Low:</strong> {stock.dayLow ? `₹${stock.dayLow}` : 'Not available'}</p>
  <p>📦 <strong>Volume:</strong> {stock.volume ? stock.volume : 'Not available'}</p>
  <p>🕒 <strong>Market Time:</strong> {stock.marketTime ? stock.marketTime : 'Not available'}</p>
</div>


          <div className="mt-4 text-sm text-blue-600">
            📌 <strong>Beginner Tip:</strong> Use this data to decide if the stock fits your strategy. Rising stocks might be trending, but always do your own research before investing.
          </div>
        </div>
      )}
    </div>
  );
};<div className="mt-4 text-sm text-blue-600">
🔍 <strong>Why is some data missing?</strong><br />
Sometimes, live stock APIs may not return all data instantly (especially during non-market hours). If you see "Not available," try again during market times or with different symbols.
</div>


export default StockSuggestions;
