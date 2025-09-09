import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const RandomNumberGenerator: React.FC = () => {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState('1');
  const [results, setResults] = useState<number[]>([]);

  const generate = () => {
    const minNum = parseInt(min);
    const maxNum = parseInt(max);
    const countNum = parseInt(count);
    if (isNaN(minNum) || isNaN(maxNum) || isNaN(countNum)) return;
    
    const newResults = [];
    for (let i = 0; i < countNum; i++) {
      newResults.push(Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
    }
    setResults(newResults);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <input type="number" value={min} onChange={e => setMin(e.target.value)} placeholder="Min" className="w-full p-3 border rounded-lg" />
        <input type="number" value={max} onChange={e => setMax(e.target.value)} placeholder="Max" className="w-full p-3 border rounded-lg" />
        <input type="number" value={count} onChange={e => setCount(e.target.value)} placeholder="Count" className="w-full p-3 border rounded-lg" />
      </div>
      <button onClick={generate} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2"><RefreshCw className="h-5 w-5" /><span>Generate</span></button>
      {results.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Generated Numbers:</h3>
          <div className="flex flex-wrap gap-3">
            {results.map((num, i) => <span key={i} className="bg-white px-3 py-1 rounded-full font-mono shadow-sm">{num}</span>)}
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomNumberGenerator;
