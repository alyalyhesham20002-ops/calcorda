import React, { useState } from 'react';

const DateDifferenceCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculateDiff = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setResult(`${diffDays} days`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Select Dates</h3>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">End Date</label><input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" /></div>
          <button onClick={calculateDiff} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg">Calculate Difference</button>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Difference</h3>
          {result ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold">{result}</div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center"><p className="text-gray-500">Select two dates to see the difference.</p></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateDifferenceCalculator;
