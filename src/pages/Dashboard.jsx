import React from 'react';
import { FaRobot, FaMoneyBillWave, FaChartLine, FaNewspaper, FaChartPie, FaCalculator, FaLightbulb } from 'react-icons/fa';

const Dashboard = () => {
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return `Good Morning!`;
    if (hours < 18) return `Good Afternoon!`;
    return `Good Evening!`;
  };

  const features = [
    {
      icon: <FaRobot size={30} className="text-purple-600" />,
      title: 'AI Financial Assistant',
      description: 'Interact with our smart AI chatbot for instant financial guidance on saving, investing, and wealth building.',
    },
    {
      icon: <FaMoneyBillWave size={30} className="text-green-600" />,
      title: 'Expense Tracker',
      description: 'Track daily spending effortlessly and visualize your expense trends with dynamic, real-time graphs.',
    },
    {
      icon: <FaChartLine size={30} className="text-blue-500" />,
      title: 'Financial Planner',
      description: 'Set, manage, and monitor personalized financial goals such as emergency funds, large purchases, and more.',
    },
    {
      icon: <FaNewspaper size={30} className="text-red-500" />,
      title: 'Market News Feed',
      description: 'Access real-time financial news and insights from trusted sources to stay ahead of market trends.',
    },
    {
      icon: <FaChartPie size={30} className="text-yellow-500" />,
      title: 'Live Stock Updates',
      description: 'Get real-time stock data from NSE and BSE with live trends and key performance indicators.',
    },
    {
      icon: <FaCalculator size={30} className="text-indigo-600" />,
      title: 'SIP Calculator',
      description: 'Simulate your mutual fund investments and forecast long-term returns with ease.',
    },
    {
      icon: <FaLightbulb size={30} className="text-teal-500" />,
      title: 'AI Stock Suggestions',
      description: 'Receive intelligent stock recommendations tailored to your risk profile and market interests.',
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">{getGreeting()}</h2>

      <p className="text-lg text-gray-700 mb-6">
        👋 Welcome to <span className="font-semibold">BudgetBeacon</span> — your intelligent partner in financial management. Explore powerful tools designed to simplify your financial journey.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-white shadow-md p-5 rounded-xl hover:shadow-lg transition-all">
            <div className="mb-3">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-8">
        Pro tip: Use the sidebar anytime to access these features and manage your financial tools seamlessly.
      </p>
    </div>
  );
};

export default Dashboard;
