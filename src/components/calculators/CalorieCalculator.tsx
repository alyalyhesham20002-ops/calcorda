import React, { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';

const CalorieCalculator: React.FC = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [goal, setGoal] = useState('maintain');
  const [unit, setUnit] = useState('metric');
  const [result, setResult] = useState<{
    bmr: number;
    maintenanceCalories: number;
    goalCalories: number;
    goalDescription: string;
  } | null>(null);

  const activityLevels = {
    sedentary: { label: 'Sedentary (little/no exercise)', multiplier: 1.2 },
    light: { label: 'Light activity (light exercise 1-3 days/week)', multiplier: 1.375 },
    moderate: { label: 'Moderate activity (moderate exercise 3-5 days/week)', multiplier: 1.55 },
    active: { label: 'Very active (hard exercise 6-7 days/week)', multiplier: 1.725 },
    extra: { label: 'Extra active (very hard exercise, physical job)', multiplier: 1.9 }
  };

  const goals = {
    lose2: { label: 'Lose 2 lbs per week', adjustment: -1000, description: 'Aggressive weight loss' },
    lose1: { label: 'Lose 1 lb per week', adjustment: -500, description: 'Moderate weight loss' },
    lose0_5: { label: 'Lose 0.5 lbs per week', adjustment: -250, description: 'Mild weight loss' },
    maintain: { label: 'Maintain weight', adjustment: 0, description: 'Weight maintenance' },
    gain0_5: { label: 'Gain 0.5 lbs per week', adjustment: 250, description: 'Mild weight gain' },
    gain1: { label: 'Gain 1 lb per week', adjustment: 500, description: 'Moderate weight gain' }
  };

  const calculateCalories = () => {
    if (!age || !height || !weight) return;

    let heightInCm = parseFloat(height);
    let weightInKg = parseFloat(weight);

    if (unit === 'imperial') {
      // Convert feet and inches to cm, pounds to kg
      const feet = Math.floor(heightInCm);
      const inches = (heightInCm - feet) * 12;
      heightInCm = (feet * 12 + inches) * 2.54;
      weightInKg = weightInKg * 0.453592;
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * parseInt(age) + 5;
    } else {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * parseInt(age) - 161;
    }

    const maintenanceCalories = bmr * activityLevels[activityLevel as keyof typeof activityLevels].multiplier;
    const goalCalories = maintenanceCalories + goals[goal as keyof typeof goals].adjustment;

    setResult({
      bmr: Math.round(bmr),
      maintenanceCalories: Math.round(maintenanceCalories),
      goalCalories: Math.round(goalCalories),
      goalDescription: goals[goal as keyof typeof goals].description
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(activityLevels).map(([key, level]) => (
                <option key={key} value={key}>{level.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(goals).map(([key, goalOption]) => (
                <option key={key} value={key}>{goalOption.label}</option>
              ))}
            </select>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={calculateCalories}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Calculator className="h-5 w-5" />
              <span>Calculate Calories</span>
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
                <h4 className="font-semibold text-blue-900 mb-4">Daily Calorie Recommendations</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-medium text-gray-700">Basal Metabolic Rate (BMR)</span>
                    <span className="font-bold text-gray-900">{result.bmr} calories</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-medium text-gray-700">Maintenance Calories</span>
                    <span className="font-bold text-gray-900">{result.maintenanceCalories} calories</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-blue-100 rounded-lg border border-blue-300">
                    <div>
                      <span className="font-medium text-blue-900">Goal Calories</span>
                      <div className="text-sm text-blue-700">{result.goalDescription}</div>
                    </div>
                    <span className="font-bold text-blue-900 text-lg">{result.goalCalories} calories</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-900 mb-3">Nutrition Tips</h4>
                <ul className="text-sm text-green-800 space-y-2">
                  <li>• Eat protein with every meal to support muscle maintenance</li>
                  <li>• Include plenty of fruits and vegetables for vitamins and fiber</li>
                  <li>• Stay hydrated with at least 8 glasses of water daily</li>
                  <li>• Choose whole grains over refined carbohydrates</li>
                  <li>• Monitor portion sizes and eat mindfully</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Note:</strong> These calculations are estimates based on general formulas. 
                  Individual metabolic rates can vary. Consult with a healthcare provider or registered 
                  dietitian for personalized nutrition advice.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <p className="text-gray-500">Enter your information to calculate your daily calorie needs</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculator;
