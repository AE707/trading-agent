'use client';

import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Zap, Target, Award } from 'lucide-react';

// Sample metrics data
const metricsData = {
  accuracy: { value: 73.42, change: 2.1, icon: Target },
  successRate: { value: 85.71, change: 5.2, icon: Award },
  averageResponseTime: { value: '142ms', change: -8.3, icon: Zap },
  totalTests: { value: 7, change: 2, icon: Activity },
};

const performanceData = [
  { phase: 'P1', accuracy: 68, f1: 65, precision: 70 },
  { phase: 'P2', accuracy: 70, f1: 68, precision: 72 },
  { phase: 'P3', accuracy: 71, f1: 70, precision: 73 },
  { phase: 'P4', accuracy: 72, f1: 71, precision: 74 },
  { phase: 'P5', accuracy: 72.5, f1: 71.5, precision: 74.5 },
  { phase: 'P6', accuracy: 73.42, f1: 72, precision: 75 },
];

const distributionData = [
  { name: 'Segment 1', value: 25, color: '#10b981' },
  { name: 'Segment 2', value: 20, color: '#3b82f6' },
  { name: 'Segment 3', value: 22, color: '#f59e0b' },
  { name: 'Segment 4', value: 18, color: '#ef4444' },
  { name: 'Segment 5', value: 15, color: '#8b5cf6' },
];

const featureData = [
  { name: 'Avg', value: 85 },
  { name: 'RSI', value: 78 },
  { name: 'Mom', value: 92 },
  { name: 'Vol', value: 88 },
  { name: 'MACD', value: 81 },
];

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon: Icon }) => (
  <div className="p-6 rounded-lg border border-dark-500/30 bg-dark-700 hover:bg-dark-600 transition-colors">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-400 text-sm mb-2">{title}</p>
        <p className="text-white text-2xl font-bold">{value}</p>
        <div className="flex items-center gap-1 mt-2">
          {change >= 0 ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-xs font-medium ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
        </div>
      </div>
      <div className="p-3 rounded-lg bg-blue-500/20">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
    </div>
  </div>
);

export default function MetricsPage() {
  const [selectedMetric, setSelectedMetric] = useState('performance');

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">📊 Metrics Dashboard</h1>
        <p className="text-gray-400">Comprehensive performance analytics and insights</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard 
          title="Accuracy" 
          value={`${metricsData.accuracy.value}%`} 
          change={metricsData.accuracy.change} 
          icon={metricsData.accuracy.icon}
        />
        <MetricCard 
          title="Success Rate" 
          value={`${metricsData.successRate.value}%`} 
          change={metricsData.successRate.change} 
          icon={metricsData.successRate.icon}
        />
        <MetricCard 
          title="Avg Response Time" 
          value={metricsData.averageResponseTime.value} 
          change={metricsData.averageResponseTime.change} 
          icon={metricsData.averageResponseTime.icon}
        />
        <MetricCard 
          title="Total Tests" 
          value={metricsData.totalTests.value} 
          change={metricsData.totalTests.change} 
          icon={metricsData.totalTests.icon}
        />
      </div>

      {/* Tabs for Different Views */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {['performance', 'distribution', 'features'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedMetric(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedMetric === tab
                ? 'bg-blue-500 text-white'
                : 'bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Performance Chart */}
        {selectedMetric === 'performance' && (
          <div className="lg:col-span-2 p-6 rounded-lg border border-dark-500/30 bg-dark-700">
            <h2 className="text-xl font-bold text-white mb-4">📈 Performance Metrics Over Phases</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="phase" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="accuracy" stroke="#10b981" name="Accuracy" />
                <Line type="monotone" dataKey="f1" stroke="#3b82f6" name="F1 Score" />
                <Line type="monotone" dataKey="precision" stroke="#f59e0b" name="Precision" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Distribution Chart */}
        {selectedMetric === 'distribution' && (
          <div className="p-6 rounded-lg border border-dark-500/30 bg-dark-700">
            <h2 className="text-xl font-bold text-white mb-4">🎯 Distribution Analysis</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Features Importance */}
        {selectedMetric === 'features' && (
          <div className="p-6 rounded-lg border border-dark-500/30 bg-dark-700">
            <h2 className="text-xl font-bold text-white mb-4">⭐ Feature Importance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={featureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                <Bar dataKey="value" fill="#3b82f6" name="Importance" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Stats Table */}
        <div className="p-6 rounded-lg border border-dark-500/30 bg-dark-700">
          <h2 className="text-xl font-bold text-white mb-4">📋 Metrics Summary</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-dark-600 rounded-lg">
              <span className="text-gray-400">Current Phase</span>
              <span className="text-white font-semibold">Phase 6</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-dark-600 rounded-lg">
              <span className="text-gray-400">Total Accuracy</span>
              <span className="text-green-400 font-semibold">73.42%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-dark-600 rounded-lg">
              <span className="text-gray-400">Success Rate</span>
              <span className="text-green-400 font-semibold">85.71%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-dark-600 rounded-lg">
              <span className="text-gray-400">Avg Response</span>
              <span className="text-blue-400 font-semibold">142ms</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-dark-600 rounded-lg">
              <span className="text-gray-400">Status</span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-green-400 font-semibold">Active</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="p-6 rounded-lg border border-dark-500/30 bg-dark-700">
        <h2 className="text-xl font-bold text-white mb-4">🔍 Detailed Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-dark-600 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">Best Phase</p>
            <p className="text-2xl font-bold text-green-400">Phase 6</p>
            <p className="text-xs text-gray-500 mt-1">Highest accuracy recorded</p>
          </div>
          <div className="p-4 bg-dark-600 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">Improvement</p>
            <p className="text-2xl font-bold text-blue-400">+5.42%</p>
            <p className="text-xs text-gray-500 mt-1">From P1 to P6</p>
          </div>
          <div className="p-4 bg-dark-600 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">Consistency</p>
            <p className="text-2xl font-bold text-purple-400">95.8%</p>
            <p className="text-xs text-gray-500 mt-1">Phase-to-phase stability</p>
          </div>
        </div>
      </div>
    </div>
  );
}
