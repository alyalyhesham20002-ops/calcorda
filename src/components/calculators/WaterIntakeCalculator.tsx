import React, { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';

const WaterIntakeCalculator: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('metric');
  const [activity, setActivity] = useState('sedentary');
  const [result, setResult] = useState<{ liters: string; ounces: string } | null>(null);

  const calculateWater = () => {
    let weightInLbs = parseFloat(weight);
    if (isNaN(weightInLbs)) return;
    if (unit === 'metric') {
      weightInLbs *= 2.20462;
    }
    let baseOunces = weightInLbs * 0.5;
    if (activity === 'active') {
      baseOunces += 24; // Add 24 oz for active individuals
    }
    const liters = (baseOunces * 0.0295735).toFixed(1);
    setResult({ liters, ounces: Math.round(baseOunces).toString() });
  };
  
  const clearForm = () => {
    setWeight('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Your Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder={`Weight (${unit})`} className="w-full p-3 border rounded-lg" />
            <select value={unit} onChange={e => setUnit(e.target.value)} className="w-full p-3 border rounded-lg">
              <option value="metric">kg</option>
              <option value="imperial">lbs</option>
            </select>
          </div>
          <select value={activity} onChange={e => setActivity(e.target.value)} className="w-full p-3 border rounded-lg">
            <option value="sedentary">Sedentary</option>
            <option value="active">Active (30+ mins exercise/day)</option>
          </select>
          <div className="flex space-x-3">
            <button onClick={calculateWater} className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2"><Calculator className="h-5 w-5" /><span>Calculate</span></button>
            <button onClick={clearForm} className="px-6 py-3 border rounded-lg flex items-center"><RotateCcw className="h-5 w-5" /></button>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recommended Daily Intake</h3>
          {result ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-blue-900">{result.liters} L</div>
              <div className="text-lg text-blue-800 mt-2">or {result.ounces} oz</div>
            </div>
          ) : (
            <div className="bg-gray-50 border rounded-lg p-6 text-center"><p className="text-gray-500">Enter info to calculate water intake.</p></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaterIntakeCalculator;
