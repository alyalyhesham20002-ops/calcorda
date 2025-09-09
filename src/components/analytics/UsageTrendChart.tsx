import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from '../../contexts/ThemeProvider';

interface UsageTrendChartProps {
  data: { date: string; uses: number }[];
}

const UsageTrendChart: React.FC<UsageTrendChartProps> = ({ data }) => {
  const { theme } = useTheme();

  const option = {
    tooltip: {
      trigger: 'axis',
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
      type: 'category',
      boundaryGap: false,
      data: data.map(item => item.date),
      axisLine: {
        lineStyle: {
          color: theme === 'dark' ? '#4a5568' : '#d1d5db',
        },
      },
      axisLabel: {
        color: theme === 'dark' ? '#a0aec0' : '#4b5563',
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: true,
        lineStyle: {
          color: theme === 'dark' ? '#4a5568' : '#d1d5db',
        },
      },
      axisLabel: {
        color: theme === 'dark' ? '#a0aec0' : '#4b5563',
      },
      splitLine: {
        lineStyle: {
          color: theme === 'dark' ? '#2d3748' : '#e5e7eb',
        },
      },
    },
    series: [
      {
        name: 'Uses',
        type: 'line',
        stack: 'Total',
        smooth: true,
        data: data.map(item => item.uses),
        itemStyle: {
          color: '#3b82f6',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: 'rgba(59, 130, 246, 0.5)'
            }, {
                offset: 1, color: 'rgba(59, 130, 246, 0)'
            }]
          }
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: '350px' }} theme={theme} />;
};

export default UsageTrendChart;
