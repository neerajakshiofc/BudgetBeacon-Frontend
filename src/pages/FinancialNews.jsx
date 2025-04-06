import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FinancialNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetching the financial news from your backend
  useEffect(() => {
    const fetchFinancialNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/financial-news');

        if (response.data && response.data.feed) {
          setNews(response.data.feed);
        } else {
          setError('No news available at the moment.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load financial news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFinancialNews();
  }, []);

  if (loading) return <div>Loading financial news...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Market News</h2>
      <div className="space-y-4">
        {news.map((article, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-lg text-blue-700 hover:underline">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(article.time_published).toLocaleString()}
            </p>
            {article.summary && <p className="text-gray-700 mt-2">{article.summary}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialNews;
