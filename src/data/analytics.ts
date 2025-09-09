import { faker } from '@faker-js/faker';
import { calculators } from './calculators';

export const getAnalyticsData = () => {
  // --- Generate usage data for ALL calculators and sort them ---
  const allCalculatorsWithUsage = calculators
    .map(calc => ({
      id: calc.id,
      name: `calculator_${calc.id.replace(/-/g, '_')}_name`, // Use key for translation
      uses: faker.number.int({ min: 100, max: 4500 }), // Generate uses for each
    }))
    .sort((a, b) => b.uses - a.uses); // Sort by most used

  // --- Summary Stats ---
  const totalUses = allCalculatorsWithUsage.reduce((sum, calc) => sum + calc.uses, 0);
  const activeUsers = faker.number.int({ min: 800, max: 1500 });
  const mostPopular = allCalculatorsWithUsage[0].id; // Get the actual most popular
  const totalUsesChange = faker.number.float({ min: -5, max: 15, precision: 0.1 });
  const activeUsersChange = faker.number.float({ min: -10, max: 20, precision: 0.1 });

  // --- Usage Trends (Last 7 Days) ---
  const usageTrends = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      // Make trend data proportional to total uses for realism
      uses: faker.number.int({ min: Math.round(totalUses / 10), max: Math.round(totalUses / 6) }),
    };
  });

  // --- Popular Calculators (Top 10) ---
  const popularCalculators = allCalculatorsWithUsage.slice(0, 10);

  // --- Device Usage ---
  const deviceUsage = [
    { name: 'Desktop', value: faker.number.int({ min: 45, max: 60 }) },
    { name: 'Mobile', value: faker.number.int({ min: 30, max: 45 }) },
    { name: 'Tablet', value: faker.number.int({ min: 5, max: 10 }) },
  ];

  return {
    summary: {
      totalUses,
      activeUsers,
      mostPopular,
      totalUsesChange,
      activeUsersChange,
    },
    usageTrends,
    popularCalculators,
    deviceUsage,
  };
};
