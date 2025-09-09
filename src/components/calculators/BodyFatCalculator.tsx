import React, { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';

const BodyFatCalculator: React.FC = () => {
  const [unit, setUnit] = useState('metric');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [result, setResult] = useState<{ bfp: number; category: string } | null>(null);

  const calculateBFP = () => {
    let h = parseFloat(height);
    let n = parseFloat(neck);
    let w = parseFloat(waist);
    let p = parseFloat(hip);

    if (unit === 'imperial') {
      h *= 2.54;
      n *= 2.54;
      w *= 2.54;
      if (gender === 'female') p *= 2.54;
    }

    if (isNaN(h) || isNaN(n) || isNaN(w) || (gender === 'female' && isNaN(p))) return;

    let bfp = 0;
    if (gender === 'male') {
      bfp = 86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
    } else {
      bfp = 163.205 * Math.log10(w + p - n) - 97.684 * Math.log10(h) - 78.387;
    }
    
    let category = '';
    const bfpRanges = gender === 'male' 
      ? { essential: 5, athletes: 13, fitness: 17, average: 24 } 
      : { essential: 13, athletes: 20, fitness: 24, average: 31 };

    if (bfp <= bfpRanges.essential) category = 'Essential Fat';
    else if (bfp <= bfpRanges.athletes) category = 'Athletes';
    else if (bfp <= bfpRanges.fitness) category = 'Fitness';
    else if (bfp <= bfpRanges.average) category = 'Average';
    else category = 'Obese';

    setResult({ bfp: parseFloat(bfp.toFixed(1)), category });
  };

  const clearForm = () => {
    setHeight(''); setNeck(''); setWaist(''); setHip(''); setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Enter Your Measurements</h3>
          <div className="grid grid-cols-2 gap-4">
            <select value={unit} onChange={e => setUnit(e.target.value)} className="w-full p-3 border rounded-lg">
              <option value="metric">Metric (cm)</option>
              <option value="imperial">Imperial (in)</option>
            </select>
            <select value={gender} onChange={e => setGender(e.target.value)} className="w-full p-3 border rounded-lg">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder={`Height (${unit === 'metric' ? 'cm' : 'in'})`} className="w-full p-3 border rounded-lg" />
          <input type="number" value={neck} onChange={e => setNeck(e.target.value)} placeholder={`Neck (${unit === 'metric' ? 'cm' : 'in'})`} className="w-full p-3 border rounded-lg" />
          <input type="number" value={waist} onChange={e => setWaist(e.target.value)} placeholder={`Waist (${unit === 'metric' ? 'cm' : 'in'})`} className="w-full p-3 border rounded-lg" />
          {gender === 'female' && <input type="number" value={hip} onChange={e => setHip(e.target.value)} placeholder={`Hip (${unit === 'metric' ? 'cm' : 'in'})`} className="w-full p-3 border rounded-lg" />}
          <div className="flex space-x-3">
            <button onClick={calculateBFP} className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2"><Calculator className="h-5 w-5" /><span>Calculate</span></button>
            <button onClick={clearForm} className="px-6 py-3 border rounded-lg flex items-center"><RotateCcw className="h-5 w-5" /></button>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Your Results</h3>
          {result ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-blue-900">{result.bfp}%</div>
              <div className="text-lg font-semibold text-blue-800 mt-2">{result.category}</div>
            </div>
          ) : (
            <div className="bg-gray-50 border rounded-lg p-6 text-center"><p className="text-gray-500">Enter measurements to estimate body fat.</p></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BodyFatCalculator;
