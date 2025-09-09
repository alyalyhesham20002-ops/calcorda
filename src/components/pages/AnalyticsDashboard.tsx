import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getAnalyticsData } from '../../data/analytics';
import StatCard from '../analytics/StatCard';
import UsageTrendChart from '../analytics/UsageTrendChart';
import PopularCalculatorsChart from '../analytics/PopularCalculatorsChart';
import DeviceUsageChart from '../analytics/DeviceUsageChart';
import { BarChart, Users, Zap } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';

type AnalyticsData = ReturnType<typeof getAnalyticsData>;

const AnalyticsDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setData(getAnalyticsData());
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!data) {
    return <LoadingSpinner />;
  }

  const { summary, usageTrends, popularCalculators, deviceUsage } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('analytics_title')}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">{t('analytics_subtitle')}</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title={t('analytics_total_uses')}
          value={summary.totalUses.toLocaleString()}
          change={summary.totalUsesChange}
          icon={BarChart}
        />
        <StatCard
          title={t('analytics_active_users')}
          value={summary.activeUsers.toLocaleString()}
          change={summary.activeUsersChange}
          icon={Users}
        />
        <StatCard
          title={t('analytics_most_popular')}
          value={t(`calculator_${summary.mostPopular.replace(/-/g, '_')}_name`)}
          icon={Zap}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('analytics_usage_trends')}</h2>
          <UsageTrendChart data={usageTrends} />
        </div>
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('analytics_popular_calcs')}</h2>
          <PopularCalculatorsChart data={popularCalculators} />
        </div>
        <div className="lg:col-span-5 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('analytics_device_usage')}</h2>
          <DeviceUsageChart data={deviceUsage} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
