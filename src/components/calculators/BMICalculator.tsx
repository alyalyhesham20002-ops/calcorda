import React, { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('metric');
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    interpretation: string;
  } | null>(null);

  const calculateBMI = () => {
    if (!height || !weight) return;

    let heightInM = parseFloat(height);
    let weightInKg = parseFloat(weight);

    if (unit === 'imperial') {
      // Convert feet and inches to meters, pounds to kg
      const feet = Math.floor(heightInM);
      const inches = (heightInM - feet) * 12;
      heightInM = (feet * 12 + inches) * 0.0254;
      weightInKg = weightInKg * 0.453592;
    } else {
      heightInM = heightInM / 100; // Convert cm to m
    }

    const bmi = weightInKg / (heightInM * heightInM);
    let category = '';
    let interpretation = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      interpretation = 'Consider consulting with a healthcare provider about healthy weight gain strategies.';
    } else if (bmi < 25) {
      category = 'Normal Weight';
      interpretation = 'You have a healthy weight for your height. Maintain your current lifestyle.';
    } else if (bmi < 30) {
      category = 'Overweight';
      interpretation = 'Consider adopting healthier eating habits and increasing physical activity.';
    } else {
      category = 'Obese';
      interpretation = 'Consult with a healthcare provider about safe weight management strategies.';
    }

    setResult({
      bmi: parseFloat(bmi.toFixed(1)),
      category,
      interpretation
    });
  };

  const clearForm = () => {
    setHeight('');
    setWeight('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Enter Your Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unit System
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="metric">Metric (cm, kg)</option>
              <option value="imperial">Imperial (ft, lbs)</option>
            </select>
          </div>

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

          <div className="flex space-x-3">
            <button
              onClick={calculateBMI}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Calculator className="h-5 w-5" />
              <span>Calculate BMI</span>
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
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-blue-900 mb-2">
                  {result.bmi}
                </div>
                <div className="text-lg font-semibold text-blue-800 mb-2">
                  {result.category}
                </div>
                <p className="text-blue-700 text-sm leading-relaxed">
                  {result.interpretation}
                </p>
              </div>

              <div className="border-t border-blue-200 pt-4">
                <h4 className="font-semibold text-blue-900 mb-2">BMI Categories:</h4>
                <div className="space-y-1 text-sm">
                  <div className={`p-2 rounded ${result.bmi < 18.5 ? 'bg-blue-100 font-semibold' : ''}`}>
                    Underweight: Below 18.5
                  </div>
                  <div className={`p-2 rounded ${result.bmi >= 18.5 && result.bmi < 25 ? 'bg-blue-100 font-semibold' : ''}`}>
                    Normal: 18.5 - 24.9
                  </div>
                  <div className={`p-2 rounded ${result.bmi >= 25 && result.bmi < 30 ? 'bg-blue-100 font-semibold' : ''}`}>
                    Overweight: 25 - 29.9
                  </div>
                  <div className={`p-2 rounded ${result.bmi >= 30 ? 'bg-blue-100 font-semibold' : ''}`}>
                    Obese: 30 and above
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <p className="text-gray-500">Enter your height and weight to calculate your BMI</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
