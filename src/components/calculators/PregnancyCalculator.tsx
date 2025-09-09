import React, { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';

const PregnancyCalculator: React.FC = () => {
  const [lmp, setLmp] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [result, setResult] = useState<{
    dueDate: string;
    weeks: number;
    days: number;
    trimester: number;
  } | null>(null);

  const calculate = () => {
    if (!lmp) return;
    const lmpDate = new Date(lmp);
    const today = new Date();
    const cycleAdjustment = cycleLength - 28;
    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 280 + cycleAdjustment);

    const daysPregnant = Math.floor((today.getTime() - lmpDate.getTime()) / (1000 * 3600 * 24));
    const weeks = Math.floor(daysPregnant / 7);
    const days = daysPregnant % 7;
    const trimester = weeks < 14 ? 1 : weeks < 28 ? 2 : 3;

    setResult({ dueDate: dueDate.toLocaleDateString(), weeks, days, trimester });
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
          <h3 className="text-lg font-semibold text-gray-900">Enter Your Information</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Day of Last Menstrual Period</label>
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
          <h3 className="text-lg font-semibold text-gray-900">Your Pregnancy Progress</h3>
          {result ? (
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-6 space-y-4">
              <div>
                <div className="text-sm font-medium text-pink-800">Estimated Due Date</div>
                <div className="text-2xl font-bold text-pink-900">{result.dueDate}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-pink-800">Current Progress</div>
                <div className="text-xl font-bold text-pink-900">{result.weeks} weeks, {result.days} days</div>
              </div>
              <div>
                <div className="text-sm font-medium text-pink-800">Current Trimester</div>
                <div className="text-xl font-bold text-pink-900">{result.trimester}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-pink-800 mb-1">Pregnancy Timeline</div>
                <div className="w-full bg-pink-200 rounded-full h-4">
                  <div className="bg-pink-500 h-4 rounded-full" style={{ width: `${(result.weeks / 40) * 100}%` }}></div>
                </div>
                <div className="flex justify-between text-xs mt-1 text-pink-700"><span>Week 1</span><span>Week 40</span></div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center"><p className="text-gray-500">Enter your info to track your pregnancy.</p></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PregnancyCalculator;
