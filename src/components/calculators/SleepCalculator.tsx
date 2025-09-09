import React, { useState } from 'react';
import { Calculator, RotateCcw, Bed, Sunrise } from 'lucide-react';

const SleepCalculator: React.FC = () => {
  const [goal, setGoal] = useState('wake-up');
  const [time, setTime] = useState('07:00');
  const [results, setResults] = useState<string[]>([]);

  const calculateSleepTimes = () => {
    const [hours, minutes] = time.split(':').map(Number);
    const targetTime = new Date();
    targetTime.setHours(hours, minutes, 0, 0);
    const sleepCycle = 90; // minutes
    const timeToFallAsleep = 15; // minutes
    const newResults = [];

    for (let i = 6; i >= 3; i--) {
      const cycleDuration = i * sleepCycle;
      let resultTime = new Date(targetTime.getTime());
      if (goal === 'wake-up') {
        resultTime.setMinutes(resultTime.getMinutes() - cycleDuration - timeToFallAsleep);
      } else {
        resultTime.setMinutes(resultTime.getMinutes() + cycleDuration + timeToFallAsleep);
      }
      newResults.push(resultTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
    setResults(newResults);
  };

  const clearForm = () => {
    setResults([]);
    setTime('07:00');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Sleep Goal</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">I want to...</label>
            <select value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg">
              <option value="wake-up">Wake up at a specific time</option>
              <option value="go-to-bed">Go to bed at a specific time</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{goal === 'wake-up' ? 'Wake-up Time' : 'Bedtime'}</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div className="flex space-x-3">
            <button onClick={calculateSleepTimes} className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2"><Calculator className="h-5 w-5" /><span>Calculate</span></button>
            <button onClick={clearForm} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg flex items-center"><RotateCcw className="h-5 w-5" /></button>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Optimal Times</h3>
          {results.length > 0 ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center text-blue-900 mb-4">
                {goal === 'wake-up' ? <Bed className="h-6 w-6 mr-3" /> : <Sunrise className="h-6 w-6 mr-3" />}
                <h4 className="font-semibold">{goal === 'wake-up' ? 'You should go to bed at one of the following times:' : 'You should wake up at one of the following times:'}</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {results.map((res, index) => (
                  <div key={index} className="bg-white text-center p-3 rounded-lg font-mono text-lg shadow-sm">{res}</div>
                ))}
              </div>
              <p className="text-xs text-blue-700 mt-4">Calculations are based on 90-minute sleep cycles and assume it takes 15 minutes to fall asleep.</p>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center"><p className="text-gray-500">Enter your goal to see optimal sleep times.</p></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SleepCalculator;
