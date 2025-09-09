import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from '../types';

interface CalculatorCardProps {
  calculator: Calculator;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ calculator }) => {
  return (
    <Link
      to={`/calculator/${calculator.id}`}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:border-blue-500 transition-all duration-200 group"
    >
      <div className="flex items-center mb-3">
        <calculator.icon className="h-8 w-8 text-blue-600 dark:text-blue-400 me-3" />
        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {calculator.name}
        </h3>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
        {calculator.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {calculator.category}
        </span>
        <span className="text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
          Calculate →
        </span>
      </div>
    </Link>
  );
};

export default React.memo(CalculatorCard);
