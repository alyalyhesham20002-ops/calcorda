import React, { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';

const HeartRateCalculator: React.FC = () => {
  const [age, setAge] = useState('');
  const [result, setResult] = useState<{ maxHr: number; zones: { name: string; range: string }[] } | null>(null);

  const calculateHr = () => {
    const ageNum = parseInt(age);
    if (isNaN(ageNum)) return;
    const maxHr = 220 - ageNum;
    const zones = [
      { name: 'Zone 1: Very Light', range: `${Math.round(maxHr * 0.5)}-${Math.round(maxHr * 0.6)} bpm` },
      { name: 'Zone 2: Light (Fat Burn)', range: `${Math.round(maxHr * 0.6)}-${Math.round(maxHr * 0.7)} bpm` },
      { name: 'Zone 3: Moderate (Aerobic)', range: `${Math.round(maxHr * 0.7)}-${Math.round(maxHr * 0.8)} bpm` },
      { name: 'Zone 4: Hard (Anaerobic)', range: `${Math.round(maxHr * 0.8)}-${Math.round(maxHr * 0.9)} bpm` },
      { name: 'Zone 5: Max Effort', range: `${Math.round(maxHr * 0.9)}-${maxHr} bpm` },
    ];
    setResult({ maxHr, zones });
  };
  
  const clearForm = () => {
    setAge('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Your Information</h3>
          <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age (e.g., 30)" className="w-full p-3 border rounded-lg" />
          <div className="flex space-x-3">
            <button onClick={calculateHr} className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2"><Calculator className="h-5 w-5" /><span>Calculate</span></button>
            <button onClick={clearForm} className="px-6 py-3 border rounded-lg flex items-center"><RotateCcw className="h-5 w-5" /></button>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Target Heart Rate Zones</h3>
          {result ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
              <div className="text-center mb-4">Max Heart Rate: <span className="font-bold">{result.maxHr} bpm</span></div>
              {result.zones.map(zone => (
                <div key={zone.name} className="flex justify-between items-center"><span className="font-medium">{zone.name}</span><span className="font-bold">{zone.range}</span></div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border rounded-lg p-6 text-center"><p className="text-gray-500">Enter age to see heart rate zones.</p></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeartRateCalculator;
