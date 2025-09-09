import React, { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';

const BloodPressureCalculator: React.FC = () => {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [result, setResult] = useState<{
    category: string;
    interpretation: string;
    color: string;
  } | null>(null);

  const getCategory = (sys: number, dia: number) => {
    if (sys > 180 || dia > 120) {
      return { category: 'Hypertensive Crisis', interpretation: 'Seek emergency medical care immediately.', color: 'bg-red-600' };
    }
    if (sys >= 140 || dia >= 90) {
      return { category: 'High Blood Pressure (Stage 2)', interpretation: 'Consult your doctor. Lifestyle changes and medication may be required.', color: 'bg-red-500' };
    }
    if (sys >= 130 || dia >= 80) {
      return { category: 'High Blood Pressure (Stage 1)', interpretation: 'Lifestyle changes are recommended. Your doctor may also prescribe medication.', color: 'bg-orange-500' };
    }
    if (sys >= 120) {
      return { category: 'Elevated', interpretation: 'You are at risk of developing high blood pressure. Adopt a healthier lifestyle.', color: 'bg-yellow-400' };
    }
    return { category: 'Normal', interpretation: 'Your blood pressure is in the healthy range. Maintain a healthy lifestyle.', color: 'bg-green-500' };
  };

  const calculateBloodPressure = () => {
    const sys = parseInt(systolic);
    const dia = parseInt(diastolic);
    if (!isNaN(sys) && !isNaN(dia)) {
      setResult(getCategory(sys, dia));
    }
  };

  const clearForm = () => {
    setSystolic('');
    setDiastolic('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Enter Your Readings</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Systolic (Top Number)</label>
            <input type="number" value={systolic} onChange={(e) => setSystolic(e.target.value)} placeholder="e.g., 120" className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Diastolic (Bottom Number)</label>
            <input type="number" value={diastolic} onChange={(e) => setDiastolic(e.target.value)} placeholder="e.g., 80" className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div className="flex space-x-3">
            <button onClick={calculateBloodPressure} className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2"><Calculator className="h-5 w-5" /><span>Calculate</span></button>
            <button onClick={clearForm} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg flex items-center"><RotateCcw className="h-5 w-5" /></button>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Results</h3>
          {result ? (
            <div className={`${result.color} text-white rounded-lg p-6`}>
              <div className="text-2xl font-bold mb-2">{result.category}</div>
              <p>{result.interpretation}</p>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center"><p className="text-gray-500">Enter readings to see your category.</p></div>
          )}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm">
            <h4 className="font-semibold mb-2">Blood Pressure Categories:</h4>
            <ul className="space-y-1">
              <li><span className="font-bold">Normal:</span> &lt;120 / &lt;80 mmHg</li>
              <li><span className="font-bold">Elevated:</span> 120-129 / &lt;80 mmHg</li>
              <li><span className="font-bold">High (Stage 1):</span> 130-139 / 80-89 mmHg</li>
              <li><span className="font-bold">High (Stage 2):</span> ≥140 / ≥90 mmHg</li>
              <li><span className="font-bold">Hypertensive Crisis:</span> &gt;180 / &gt;120 mmHg</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodPressureCalculator;
