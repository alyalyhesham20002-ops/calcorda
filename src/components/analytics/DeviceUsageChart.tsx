import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from '../../contexts/ThemeProvider';

interface DeviceUsageChartProps {
  data: { name: string; value: number }[];
}

const DeviceUsageChart: React.FC<DeviceUsageChartProps> = ({ data }) => {
  const { theme } = useTheme();

  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: theme === 'dark' ? '#2d3748' : '#ffffff',
      borderColor: theme === 'dark' ? '#4a5568' : '#e2e8f0',
      textStyle: {
        color: theme === 'dark' ? '#e2e8f0' : '#2d3748',
      },
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        color: theme === 'dark' ? '#a0aec0' : '#4b5563',
      },
    },
    series: [
      {
        name: 'Device Usage',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold',
            color: theme === 'dark' ? '#e2e8f0' : '#2d3748',
          },
        },
        labelLine: {
          show: false,
        },
        data: data,
      },
    ],
    color: ['#3b82f6', '#60a5fa', '#93c5fd'],
  };

  return <ReactECharts option={option} style={{ height: '300px' }} theme={theme} />;
};

export default DeviceUsageChart;
