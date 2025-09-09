import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from '../../contexts/ThemeProvider';
import { useTranslation } from 'react-i18next';

interface PopularCalculatorsChartProps {
  data: { name: string; uses: number }[];
}

const PopularCalculatorsChart: React.FC<PopularCalculatorsChartProps> = ({ data }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: theme === 'dark' ? '#2d3748' : '#ffffff',
      borderColor: theme === 'dark' ? '#4a5568' : '#e2e8f0',
      textStyle: {
        color: theme === 'dark' ? '#e2e8f0' : '#2d3748',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      axisLabel: {
        color: theme === 'dark' ? '#a0aec0' : '#4b5563',
      },
      splitLine: {
        lineStyle: {
          color: theme === 'dark' ? '#2d3748' : '#e5e7eb',
        },
      },
    },
    yAxis: {
      type: 'category',
      data: data.map(item => t(item.name)).reverse(),
      axisLabel: {
        color: theme === 'dark' ? '#a0aec0' : '#4b5563',
        fontSize: 10,
      },
    },
    series: [
      {
        name: 'Uses',
        type: 'bar',
        data: data.map(item => item.uses).reverse(),
        itemStyle: {
          color: '#3b82f6',
          borderRadius: [0, 5, 5, 0],
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: '350px' }} theme={theme} />;
};

export default PopularCalculatorsChart;
