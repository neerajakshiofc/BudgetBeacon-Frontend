import React, { useState } from 'react';

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [annualReturn, setAnnualReturn] = useState('');
  const [investmentDuration, setInvestmentDuration] = useState('');
  const [maturityAmount, setMaturityAmount] = useState(null);

  const calculateSIP = () => {
    if (!monthlyInvestment || !annualReturn || !investmentDuration) {
      alert('Please fill in all the fields');
      return;
    }

    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(annualReturn) / 12 / 100;
    const n = parseInt(investmentDuration) * 12;

    const A = P * (((1 + r) ** n - 1) / r) * (1 + r);

    setMaturityAmount(A.toFixed(2));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full transition duration-500">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">SIP Calculator</h2>

        <div className="space-y-5">
          {/* Input: Monthly Investment */}
          <div>
            <label htmlFor="monthlyInvestment" className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Investment (₹)
            </label>
            <input
              type="number"
              id="monthlyInvestment"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              placeholder="e.g. 5000"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Input: Annual Return */}
          <div>
            <label htmlFor="annualReturn" className="block text-sm font-medium text-gray-700 mb-1">
              Expected Annual Return (%)
            </label>
            <input
              type="number"
              id="annualReturn"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value)}
              placeholder="e.g. 12"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Input: Duration */}
          <div>
            <label htmlFor="investmentDuration" className="block text-sm font-medium text-gray-700 mb-1">
              Investment Duration (Years)
            </label>
            <input
              type="number"
              id="investmentDuration"
              value={investmentDuration}
              onChange={(e) => setInvestmentDuration(e.target.value)}
              placeholder="e.g. 10"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Button */}
          <div className="text-center">
            <button
              onClick={calculateSIP}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
            >
              Calculate Maturity Amount
            </button>
          </div>

          {/* Result */}
          {maturityAmount && (
            <div className="text-center mt-6 animate-fadeIn">
              <h3 className="text-lg font-medium text-gray-700">Maturity Amount</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">₹{maturityAmount}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SIPCalculator;
