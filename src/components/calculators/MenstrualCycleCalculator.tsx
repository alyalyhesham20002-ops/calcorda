import React, { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';

const MenstrualCycleCalculator: React.FC = () => {
  const [lmp, setLmp] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [result, setResult] = useState<{
    nextPeriod: string;
    fertileWindowStart: string;
    fertileWindowEnd: string;
  } | null>(null);

  const calculate = () => {
    if (!lmp) return;
    const lmpDate = new Date(lmp);
    const ovulationDay = cycleLength - 14;

    const nextPeriod = new Date(lmpDate);
    nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

    const ovulationDate = new Date(lmpDate);
    ovulationDate.setDate(ovulationDate.getDate() + ovulationDay);

    const fertileWindowStart = new Date(ovulationDate);
    fertileWindowStart.setDate(fertileWindowStart.getDate() - 5);

    setResult({
      nextPeriod: nextPeriod.toLocaleDateString(),
      fertileWindowStart: fertileWindowStart.toLocaleDateString(),
      fertileWindowEnd: new Date(ovulationDate.setDate(ovulationDate.getDate() + 1)).toLocaleDateString(),
    });
  };

  const clearForm = () => {
    setLmp('');
    setCycleLength(28);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Enter Your Cycle Information</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Day of Last Period</label>
            <input type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Average Cycle Length (days)</label>
            <input type="number" value={cycleLength} onChange={(e) => setCycleLength(Number(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div className="flex space-x-3">
            <button onClick={calculate} className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2"><Calculator className="h-5 w-5" /><span>Calculate</span></button>
            <button onClick={clearForm} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg flex items-center"><RotateCcw className="h-5 w-5" /></button>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Cycle Prediction</h3>
          {result ? (
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-6 space-y-4">
              <div>
                <div className="text-sm font-medium text-pink-800">Next Estimated Period</div>
                <div className="text-2xl font-bold text-pink-900">{result.nextPeriod}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-pink-800">Next Fertile Window</div>
                <div className="text-xl font-bold text-pink-900">{result.fertileWindowStart} - {result.fertileWindowEnd}</div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center"><p className="text-gray-500">Enter your info to predict your cycle.</p></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenstrualCycleCalculator;
