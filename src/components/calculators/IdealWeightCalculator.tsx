import React, { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';

const IdealWeightCalculator: React.FC = () => {
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [unit, setUnit] = useState('metric');
  const [result, setResult] = useState<{ range: string; bmiRange: string } | null>(null);

  const calculateWeight = () => {
    let heightInInches = parseFloat(height);
    if (isNaN(heightInInches)) return;
    if (unit === 'metric') {
      heightInInches /= 2.54;
    }
    
    if (heightInInches <= 60) return;
    const heightOver5Ft = heightInInches - 60;
    
    let robinson, miller, devine, hamwi;
    if (gender === 'male') {
      robinson = 52 + 1.9 * heightOver5Ft;
      miller = 56.2 + 1.41 * heightOver5Ft;
      devine = 50 + 2.3 * heightOver5Ft;
      hamwi = 48 + 2.7 * heightOver5Ft;
    } else {
      robinson = 49 + 1.7 * heightOver5Ft;
      miller = 53.1 + 1.36 * heightOver5Ft;
      devine = 45.5 + 2.3 * heightOver5Ft;
      hamwi = 45.5 + 2.2 * heightOver5Ft;
    }
    const weights = [robinson, miller, devine, hamwi];
    const avg = weights.reduce((a, b) => a + b, 0) / weights.length;
    const range = `${(avg * 0.9).toFixed(1)} - ${(avg * 1.1).toFixed(1)} kg`;
    
    const heightInM = heightInInches * 0.0254;
    const bmiMin = (18.5 * heightInM * heightInM).toFixed(1);
    const bmiMax = (24.9 * heightInM * heightInM).toFixed(1);
    
    setResult({ range, bmiRange: `${bmiMin} - ${bmiMax} kg` });
  };
  
  const clearForm = () => {
    setHeight('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Your Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <select value={gender} onChange={e => setGender(e.target.value)} className="w-full p-3 border rounded-lg"><option value="male">Male</option><option value="female">Female</option></select>
            <select value={unit} onChange={e => setUnit(e.target.value)} className="w-full p-3 border rounded-lg"><option value="metric">cm</option><option value="imperial">in</option></select>
          </div>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder={`Height (${unit})`} className="w-full p-3 border rounded-lg" />
          <div className="flex space-x-3">
            <button onClick={calculateWeight} className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2"><Calculator className="h-5 w-5" /><span>Calculate</span></button>
            <button onClick={clearForm} className="px-6 py-3 border rounded-lg flex items-center"><RotateCcw className="h-5 w-5" /></button>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Ideal Weight Range</h3>
          {result ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
              <div><div className="font-medium">Healthy BMI Range (18.5-24.9)</div><div className="font-bold text-lg">{result.bmiRange}</div></div>
              <div><div className="font-medium">Based on various formulas</div><div className="font-bold text-lg">{result.range}</div></div>
            </div>
          ) : (
            <div className="bg-gray-50 border rounded-lg p-6 text-center"><p className="text-gray-500">Enter info to calculate ideal weight.</p></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdealWeightCalculator;
