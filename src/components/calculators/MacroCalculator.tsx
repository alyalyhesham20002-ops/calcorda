import React, { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';

const MacroCalculator: React.FC = () => {
  const [calories, setCalories] = useState('2000');
  const [goal, setGoal] = useState('balanced');
  const [result, setResult] = useState<{ protein: number; carbs: number; fat: number } | null>(null);

  const presets = {
    balanced: { p: 0.30, c: 0.40, f: 0.30, label: 'Balanced' },
    lowcarb: { p: 0.40, c: 0.20, f: 0.40, label: 'Low Carb' },
    highprotein: { p: 0.40, c: 0.30, f: 0.30, label: 'High Protein' },
  };

  const calculateMacros = () => {
    const cals = parseInt(calories);
    if (isNaN(cals)) return;
    const preset = presets[goal as keyof typeof presets];
    const protein = Math.round((cals * preset.p) / 4);
    const carbs = Math.round((cals * preset.c) / 4);
    const fat = Math.round((cals * preset.f) / 9);
    setResult({ protein, carbs, fat });
  };
  
  const clearForm = () => {
    setCalories('2000');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Your Diet Plan</h3>
          <input type="number" value={calories} onChange={e => setCalories(e.target.value)} placeholder="Daily Calories (e.g., 2000)" className="w-full p-3 border rounded-lg" />
          <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full p-3 border rounded-lg">
            {Object.entries(presets).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}
          </select>
          <div className="flex space-x-3">
            <button onClick={calculateMacros} className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2"><Calculator className="h-5 w-5" /><span>Calculate</span></button>
            <button onClick={clearForm} className="px-6 py-3 border rounded-lg flex items-center"><RotateCcw className="h-5 w-5" /></button>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Daily Macronutrients (grams)</h3>
          {result ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
              <div className="flex justify-between items-center"><span className="font-medium">Protein</span><span className="font-bold text-lg">{result.protein}g</span></div>
              <div className="flex justify-between items-center"><span className="font-medium">Carbohydrates</span><span className="font-bold text-lg">{result.carbs}g</span></div>
              <div className="flex justify-between items-center"><span className="font-medium">Fat</span><span className="font-bold text-lg">{result.fat}g</span></div>
            </div>
          ) : (
            <div className="bg-gray-50 border rounded-lg p-6 text-center"><p className="text-gray-500">Enter calories and goal to see macros.</p></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MacroCalculator;
