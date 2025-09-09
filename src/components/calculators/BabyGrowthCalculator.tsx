import React, { useState } from 'react';
import { faker } from '@faker-js/faker';

const BabyGrowthCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('boy');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [head, setHead] = useState('');
  const [result, setResult] = useState<{
    weightP: number;
    lengthP: number;
    headP: number;
  } | null>(null);

  const calculate = () => {
    if (birthDate && weight && length && head) {
      setResult({
        weightP: faker.number.int({ min: 5, max: 95 }),
        lengthP: faker.number.int({ min: 5, max: 95 }),
        headP: faker.number.int({ min: 5, max: 95 }),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Enter Baby's Measurements</h3>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Birth Date</label><input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Gender</label><select value={gender} onChange={e => setGender(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg"><option value="boy">Boy</option><option value="girl">Girl</option></select></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label><input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Length (cm)</label><input type="number" value={length} onChange={e => setLength(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Head Circumference (cm)</label><input type="number" value={head} onChange={e => setHead(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" /></div>
          <button onClick={calculate} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg">Calculate Percentiles</button>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Growth Percentiles</h3>
          {result ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
              <p className="text-xs text-blue-700">Note: These are sample percentiles for demonstration. Consult a pediatrician for accurate tracking.</p>
              <div className="flex justify-between items-baseline"><span>Weight:</span><span className="text-2xl font-bold">{result.weightP}th percentile</span></div>
              <div className="flex justify-between items-baseline"><span>Length:</span><span className="text-2xl font-bold">{result.lengthP}th percentile</span></div>
              <div className="flex justify-between items-baseline"><span>Head Circumference:</span><span className="text-2xl font-bold">{result.headP}th percentile</span></div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center"><p className="text-gray-500">Enter measurements to see percentiles.</p></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BabyGrowthCalculator;
