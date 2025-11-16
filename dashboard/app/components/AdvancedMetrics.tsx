'use client';

import React from 'react';
import { TrendingUp, TrendingDown, BarChart3, Activity } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MetricData {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
}

interface AdvancedMetricsProps {
  data?: MetricData[];
}

const AdvancedMetrics: React.FC<AdvancedMetricsProps> = ({ data = defaultMetrics }) => {
  const performanceData = [
    { phase: 'P1', accuracy: 78, f1: 0.75, precision: 0.82 },
    { phase: 'P2', accuracy: 82, f1: 0.80, precision: 0.85 },
    { phase: 'P3', accuracy: 85, f1: 0.83, precision: 0.88 },
    { phase: 'P4', accuracy: 88, f1: 0.86, precision: 0.90 },
    { phase: 'P5', accuracy: 91, f1: 0.89, precision: 0.93 },
    { phase: 'P6', accuracy: 93, f1: 0.91, precision: 0.95 },
    { phase: 'P7', accuracy: 95, f1: 0.93, precision: 0.96 },
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{metric.value}%</p>
              </div>
              <div className={`p-3 rounded-full ${
                metric.trend === 'up' 
                  ? 'bg-green-100 dark:bg-green-900' 
                  : 'bg-red-100 dark:bg-red-900'
              }`}>
                {metric.trend === 'up' ? (
                  <TrendingUp size={24} className="text-green-600" />
                ) : (
                  <TrendingDown size={24} className="text-red-600" />
                )}
              </div>
            </div>
            <div className={`mt-4 text-sm font-semibold ${
              metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {metric.trend === 'up' ? '+' : '-'}{Math.abs(metric.change)}% from last phase
            </div>
          </div>
        ))}
      </div>

      {/* Performance Comparison Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BarChart3 size={20} />
          Performance Across Phases
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="phase" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="f1" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="precision" stroke="#f59e0b" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Metrics Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Activity size={20} />
            Detailed Metrics
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Phase</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Accuracy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">F1 Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Precision</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {performanceData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{row.phase}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{row.accuracy}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{row.f1.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{row.precision.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Passed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const defaultMetrics: MetricData[] = [
  { label: 'Overall Accuracy', value: 95, change: 5, trend: 'up' },
  { label: 'F1 Score', value: 93, change: 3, trend: 'up' },
  { label: 'Precision', value: 96, change: 2, trend: 'up' },
  { label: 'Recall', value: 91, change: 4, trend: 'up' },
];

export default AdvancedMetrics;
