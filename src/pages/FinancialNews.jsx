// frontend/src/components/FinancialNews.jsx
import React, { useEffect, useState } from 'react';

const FinancialNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/financial-news');
        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error('Error fetching news:', err);
        setNews([
          {
            title: 'Unable to load news.',
            link: '#',
            pubDate: new Date().toISOString(),
            source: 'System',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading Yahoo Finance news...</p>;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">📰 Economic Times News</h2>
      <ul className="space-y-4">
        {news.map((article, index) => (
          <li key={index} className="border-b pb-3">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              {article.title}
            </a>
            <p className="text-sm text-gray-500">{new Date(article.pubDate).toLocaleString()}</p>
            <p className="text-xs text-gray-400">{article.source}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinancialNews;
