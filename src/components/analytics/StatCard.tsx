import React from 'react';
import { LucideIcon, ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, change }) => {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</p>
        <Icon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
      </div>
      <div className="mt-1">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</h3>
        {change !== undefined && (
          <div className={`flex items-center text-sm font-medium mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            <span>{Math.abs(change)}%</span>
            <span className="ml-1 text-gray-500 dark:text-gray-400">vs last week</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
