import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockSuggestions = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [symbol, setSymbol] = useState('AAPL'); // default stock symbol

  // Fetch stock data from your backend API
  const fetchStockData = async (symbol) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:5000/api/stock-suggestions`, {
        params: { symbol },
      });

      if (response.data && response.data.length > 0) {
        setStockData(response.data);
      } else {
        setError('No stock data available for this symbol.');
      }
    } catch (err) {
      setError('Failed to fetch stock data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle stock symbol change
  const handleSymbolChange = (e) => {
    setSymbol(e.target.value.toUpperCase());
  };

  // Fetch on mount and when symbol changes
  useEffect(() => {
    fetchStockData(symbol);
  }, [symbol]);

  if (loading) return <div>Loading stock data...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Stock Suggestions</h2>

      {/* Symbol input field */}
      <div className="mb-4">
        <label htmlFor="symbol" className="block text-sm font-medium text-gray-600">
          Enter Stock Symbol
        </label>
        <input
          type="text"
          id="symbol"
          value={symbol}
          onChange={handleSymbolChange}
          className="mt-1 p-2 border border-gray-300 rounded w-64"
        />
      </div>

      {/* Stock Data Display */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {stockData.map((stock, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-medium">Date: {stock.date}</h3>
            <p className="text-gray-600">Open: ${stock.open}</p>
            <p className="text-gray-600">Close: ${stock.close}</p>
            <p className="text-gray-600">High: ${stock.high}</p>
            <p className="text-gray-600">Low: ${stock.low}</p>
            <p className="text-gray-600">Volume: {stock.volume}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockSuggestions;
