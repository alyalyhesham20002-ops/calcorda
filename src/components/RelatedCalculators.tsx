import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { calculators as calculatorData } from '../data/calculators';
import CalculatorCard from './CalculatorCard';
import { Calculator } from '../types';

interface RelatedCalculatorsProps {
  currentCalculatorId: string;
  categoryKey: 'header_health' | 'header_pregnancy' | 'header_tools';
}

const RelatedCalculators: React.FC<RelatedCalculatorsProps> = ({ currentCalculatorId, categoryKey }) => {
  const { t } = useTranslation();

  const relatedCalculators = useMemo(() => {
    const allCalculators: Calculator[] = calculatorData.map(calc => ({
      ...calc,
      name: t(`calculator_${calc.id.replace(/-/g, '_')}_name`),
      description: t(`calculator_${calc.id.replace(/-/g, '_')}_desc`),
      category: t(calc.categoryKey),
    }));

    return allCalculators
      .filter(calc => calc.categoryKey === categoryKey && calc.id !== currentCalculatorId)
      .sort(() => 0.5 - Math.random()) // Shuffle them
      .slice(0, 4); // Take up to 4
  }, [currentCalculatorId, categoryKey, t]);

  if (relatedCalculators.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Related Calculators
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {relatedCalculators.map((calculator) => (
          <CalculatorCard key={calculator.id} calculator={calculator} />
        ))}
      </div>
    </section>
  );
};

export default RelatedCalculators;
