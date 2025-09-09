import React, { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';

const BMRCalculator: React.FC = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('metric');
  const [formula, setFormula] = useState('mifflin');
  const [result, setResult] = useState<{
    bmr: number;
    formula: string;
    dailyCalories: {
      sedentary: number;
      light: number;
      moderate: number;
      active: number;
      extra: number;
    };
  } | null>(null);

  const calculateBMR = () => {
    if (!age || !height || !weight) return;

    let heightInCm = parseFloat(height);
    let weightInKg = parseFloat(weight);

    if (unit === 'imperial') {
      const feet = Math.floor(heightInCm);
      const inches = (heightInCm - feet) * 12;
      heightInCm = (feet * 12 + inches) * 2.54;
      weightInKg = weightInKg * 0.453592;
    }

    let bmr = 0;
    let formulaName = '';

    if (formula === 'mifflin') {
      formulaName = 'Mifflin-St Jeor Equation';
      if (gender === 'male') {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * parseInt(age) + 5;
      } else {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * parseInt(age) - 161;
      }
    } else if (formula === 'harris') {
      formulaName = 'Harris-Benedict Equation';
      if (gender === 'male') {
        bmr = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * parseInt(age));
      } else {
        bmr = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * parseInt(age));
      }
    } else if (formula === 'katch') {
      formulaName = 'Katch-McArdle Formula (requires body fat %)';
      // This is a simplified version - in reality would need body fat percentage
      bmr = 370 + (21.6 * (weightInKg * 0.85)); // Assuming 15% body fat
    }

    const dailyCalories = {
      sedentary: Math.round(bmr * 1.2),
      light: Math.round(bmr * 1.375),
      moderate: Math.round(bmr * 1.55),
      active: Math.round(bmr * 1.725),
      extra: Math.round(bmr * 1.9)
    };

    setResult({
      bmr: Math.round(bmr),
      formula: formulaName,
      dailyCalories
    });
  };

  const clearForm = () => {
    setAge('');
    setHeight('');
    setWeight('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Enter Your Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Formula</label>
            <select
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="mifflin">Mifflin-St Jeor (Most Accurate)</option>
              <option value="harris">Harris-Benedict (Traditional)</option>
              <option value="katch">Katch-McArdle (For Athletes)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g., 30"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Unit System</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="metric">Metric (cm, kg)</option>
              <option value="imperial">Imperial (ft, lbs)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height ({unit === 'metric' ? 'cm' : 'ft.in'})
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unit === 'metric' ? 'e.g., 170' : 'e.g., 5.8'}
                step={unit === 'metric' ? '1' : '0.1'}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight ({unit === 'metric' ? 'kg' : 'lbs'})
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === 'metric' ? 'e.g., 70' : 'e.g., 154'}
                step="0.1"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={calculateBMR}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Calculator className="h-5 w-5" />
              <span>Calculate BMR</span>
            </button>
            <button
              onClick={clearForm}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Results</h3>
          
          {result ? (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-blue-900 mb-2">
                    {result.bmr} calories/day
                  </div>
                  <div className="text-lg text-blue-800 mb-2">
                    Basal Metabolic Rate
                  </div>
                  <div className="text-sm text-blue-700">
                    Calculated using: {result.formula}
                  </div>
                </div>

                <div className="bg-blue-100 rounded-lg p-4">
                  <p className="text-blue-800 text-sm leading-relaxed">
                    This is the number of calories your body burns at rest to maintain basic physiological functions 
                    like breathing, circulation, and cell production.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Daily Calorie Needs by Activity Level</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-700">Sedentary</div>
                      <div className="text-sm text-gray-600">Little/no exercise</div>
                    </div>
                    <span className="font-bold text-gray-900">{result.dailyCalories.sedentary} cal</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-700">Light Activity</div>
                      <div className="text-sm text-gray-600">Light exercise 1-3 days/week</div>
                    </div>
                    <span className="font-bold text-gray-900">{result.dailyCalories.light} cal</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-700">Moderate Activity</div>
                      <div className="text-sm text-gray-600">Moderate exercise 3-5 days/week</div>
                    </div>
                    <span className="font-bold text-gray-900">{result.dailyCalories.moderate} cal</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-700">Very Active</div>
                      <div className="text-sm text-gray-600">Hard exercise 6-7 days/week</div>
                    </div>
                    <span className="font-bold text-gray-900">{result.dailyCalories.active} cal</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-700">Extra Active</div>
                      <div className="text-sm text-gray-600">Very hard exercise/physical job</div>
                    </div>
                    <span className="font-bold text-gray-900">{result.dailyCalories.extra} cal</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Key Points:</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• BMR accounts for 60-75% of daily calorie burn</li>
                  <li>• Muscle tissue burns more calories than fat tissue</li>
                  <li>• BMR naturally decreases with age</li>
                  <li>• Use total daily calories for weight management planning</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <p className="text-gray-500">Enter your information to calculate your BMR</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMRCalculator;
