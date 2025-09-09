import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Heart, Baby, Settings } from 'lucide-react';
import { calculators as calculatorData } from '../data/calculators';
import { Calculator } from '../types';
import CalculatorCard from './CalculatorCard';
import AdSenseAd from './AdSenseAd';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const calculators: Calculator[] = useMemo(() => calculatorData.map(calc => ({
    ...calc,
    name: t(`calculator_${calc.id.replace(/-/g, '_')}_name`),
    description: t(`calculator_${calc.id.replace(/-/g, '_')}_desc`),
    category: t(calc.categoryKey),
  })), [t]);

  const filteredCalculators = calculators.filter(calc =>
    calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    calc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    calc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    {
      id: 'health',
      name: t('header_health'),
      icon: Heart,
      color: 'bg-red-500',
      calculators: filteredCalculators.filter(calc => calc.categoryKey === 'header_health')
    },
    {
      id: 'pregnancy',
      name: t('header_pregnancy'),
      icon: Baby,
      color: 'bg-pink-500',
      calculators: filteredCalculators.filter(calc => calc.categoryKey === 'header_pregnancy')
    },
    {
      id: 'tools',
      name: t('header_tools'),
      icon: Settings,
      color: 'bg-blue-500',
      calculators: filteredCalculators.filter(calc => calc.categoryKey === 'header_tools')
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdSenseAd slot="top-banner" className="mb-8" />

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('dashboard_title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          {t('dashboard_subtitle')}
        </p>

        <div className="relative max-w-md mx-auto">
          <Search className="absolute start-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder={t('search_placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full ps-10 pe-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
          />
        </div>
      </div>

      {categories.map((category) => (
        <section key={category.id} id={category.id} className="mb-16">
          <div className="flex items-center mb-6">
            <div className={`${category.color} p-3 rounded-lg me-4`}>
              <category.icon className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{category.name}</h2>
            <span className="ms-3 text-gray-500 dark:text-gray-400 text-sm">({category.calculators.length} {t('tools_count')})</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {category.calculators.map((calculator) => (
              <CalculatorCard key={calculator.id} calculator={calculator} />
            ))}
          </div>
        </section>
      ))}

      {filteredCalculators.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">{t('no_calculators_found')} "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
