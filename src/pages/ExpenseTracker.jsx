import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(savedExpenses);
  }, []);

  const addExpense = () => {
    if (!expenseName || !amount || !date) {
      alert('Please fill in all fields');
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: expenseName,
      amount: parseFloat(amount),
      date,
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    setExpenseName('');
    setAmount('');
    setDate('');
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const groupedExpenses = expenses.reduce((acc, curr) => {
    acc[curr.name] = (acc[curr.name] || 0) + curr.amount;
    return acc;
  }, {});

  const labels = Object.keys(groupedExpenses);
  const originalValues = Object.values(groupedExpenses);
  const logValues = originalValues.map((val) => Math.log10(val + 1));

  const pieData = {
    labels: labels,
    datasets: [
      {
        label: 'Expenses (log scale)',
        data: logValues,
        backgroundColor: labels.map((_, i) => {
          const colors = [
            '#6366F1', '#EC4899', '#FBBF24', '#34D399',
            '#60A5FA', '#F87171', '#A78BFA', '#F472B6',
            '#22D3EE', '#10B981', '#FB923C', '#E879F9',
          ];
          return colors[i % colors.length];
        }),
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const label = labels[index];
            const value = originalValues[index];
            return `${label}: ₹${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">💰 Expenses Tracker</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Expense Name"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={addExpense}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition duration-200"
        >
          ➕ Add Expense
        </button>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">📋 Expense List</h3>
        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses added yet.</p>
        ) : (
          <ul className="space-y-4">
            {expenses.map((expense) => (
              <li
                key={expense.id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
              >
                <div>
                  <p className="font-medium">{expense.name}</p>
                  <p className="text-gray-600 text-sm">{expense.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-600 font-semibold">₹{expense.amount}</span>
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="text-right text-xl font-semibold text-indigo-700 mb-6">
        Total Expenses: ₹
        {expenses.reduce((total, expense) => total + expense.amount, 0).toFixed(2)}
      </div>

      {expenses.length > 0 && (
        <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
          <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">📊 Expense Distribution</h3>
          <div className="w-64 h-64 mx-auto">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesTracker;
