import React, { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';
import ShareButton from '../ShareButton';

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

    let heightInMeters: number;
    let weightInKg: number;

    if (unit === 'imperial') {
      const totalInches = parseFloat(height) * 12;
      heightInMeters = totalInches * 0.0254;
      weightInKg = parseFloat(weight) * 0.453592;
    } else {
      heightInMeters = parseFloat(height) / 100;
      weightInKg = parseFloat(weight);
    }

    if (isNaN(heightInMeters) || isNaN(weightInKg) || heightInMeters <= 0 || weightInKg <= 0) {
      return;
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);
    let category = '';
    let interpretation = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      interpretation = 'Your BMI is in the underweight range. Consider consulting with a healthcare provider about healthy weight gain strategies.';
    } else if (bmi < 25) {
      category = 'Normal Weight';
      interpretation = 'Congratulations! You have a healthy weight for your height. Maintain your current healthy lifestyle.';
    } else if (bmi < 30) {
      category = 'Overweight';
      interpretation = 'Your BMI is in the overweight range. Consider adopting healthier eating habits and increasing physical activity.';
    } else {
      category = 'Obese';
      interpretation = 'Your BMI is in the obese range. It is recommended to consult with a healthcare provider about safe weight management strategies.';
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

  const handleUnitChange = (newUnit: string) => {
    setUnit(newUnit);
    setHeight('');
    setWeight('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Enter Your Information</h3>
          
          <div>
            <label htmlFor="unit-system" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Unit System
            </label>
            <select
              id="unit-system"
              value={unit}
              onChange={(e) => handleUnitChange(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700"
            >
              <option value="metric">Metric (cm, kg)</option>
              <option value="imperial">Imperial (ft, lbs)</option>
            </select>
          </div>

          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Height ({unit === 'metric' ? 'cm' : 'ft'})
            </label>
            <input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={unit === 'metric' ? 'e.g., 170' : 'e.g., 5.83 (for 5ft 10in)'}
              step={unit === 'metric' ? '1' : '0.01'}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Weight ({unit === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={unit === 'metric' ? 'e.g., 70' : 'e.g., 154'}
              step="0.1"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700"
            />
          </div>

          <div className="flex space-x-3 rtl:space-x-reverse">
            <button
              onClick={calculateBMI}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse"
            >
              <Calculator className="h-5 w-5" />
              <span>Calculate BMI</span>
            </button>
            <button
              onClick={clearForm}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
              aria-label="Clear form"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Results</h3>
          
          {result ? (
            <div className="bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 rounded-lg p-6">
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-blue-900 dark:text-white mb-2">
                  {result.bmi}
                </div>
                <div className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  {result.category}
                </div>
                <p className="text-blue-700 dark:text-blue-200 text-sm leading-relaxed">
                  {result.interpretation}
                </p>
              </div>

              <div className="border-t border-blue-200 dark:border-gray-500 pt-4">
                <h4 className="font-semibold text-blue-900 dark:text-white mb-2">BMI Categories (WHO):</h4>
                <div className="space-y-1 text-sm">
                  <div className={`p-2 rounded transition-colors ${result.bmi < 18.5 ? 'bg-blue-100 dark:bg-blue-900 font-semibold' : 'text-gray-700 dark:text-gray-300'}`}>
                    Underweight: &lt; 18.5
                  </div>
                  <div className={`p-2 rounded transition-colors ${result.bmi >= 18.5 && result.bmi < 25 ? 'bg-blue-100 dark:bg-blue-900 font-semibold' : 'text-gray-700 dark:text-gray-300'}`}>
                    Normal weight: 18.5 – 24.9
                  </div>
                  <div className={`p-2 rounded transition-colors ${result.bmi >= 25 && result.bmi < 30 ? 'bg-blue-100 dark:bg-blue-900 font-semibold' : 'text-gray-700 dark:text-gray-300'}`}>
                    Overweight: 25 – 29.9
                  </div>
                  <div className={`p-2 rounded transition-colors ${result.bmi >= 30 ? 'bg-blue-100 dark:bg-blue-900 font-semibold' : 'text-gray-700 dark:text-gray-300'}`}>
                    Obesity: 30 or greater
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <ShareButton 
                  title="Check out my BMI result!"
                  text={`I just calculated my BMI on Calcorda and it's ${result.bmi} (${result.category}). Check yours too!`}
                />
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center h-full flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Enter your height and weight to calculate your BMI and see where you stand.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
