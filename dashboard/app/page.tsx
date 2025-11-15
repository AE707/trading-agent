'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import MetricsCard from './components/MetricsCard';
import TestPhases from './components/TestPhases';

// Data for ML Pipeline phases progression
const phaseData = [
  { name: 'Phase 1', accuracy: 68 },
  { name: 'Phase 2', accuracy: 71 },
  { name: 'Phase 3', accuracy: 72 },
  { name: 'Phase 4', accuracy: 73 },
  { name: 'Phase 5', accuracy: 73.2 },
  { name: 'Phase 6', accuracy: 73.42 },
];

// Feature importance data
const featureData = [
  { name: 'Moving Avg', value: 92 },
  { name: 'RSI', value: 85 },
  { name: 'Momentum', value: 78 },
  { name: 'Volume', value: 72 },
  { name: 'MACD', value: 68 },
];

const COLORS = ['#0086cc', '#00cc99', '#ffcc00', '#ff6b6b', '#4ecdc4'];

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    modelAccuracy: 73.42,
    totalTests: 7,
    successRate: 85.71,
    avgPredictionTime: 142,
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch metrics from API if needed
    setLoading(false);
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 border-r border-gray-700 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-4 space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded"></div>
            {sidebarOpen && <span className="font-bold text-lg">TA</span>}
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {['Overview', 'Metrics', 'Predictions', 'Features', 'Settings'].map((item) => (
              <div
                key={item}
                className="px-4 py-2 rounded hover:bg-gray-700 cursor-pointer transition-colors"
              >
                {sidebarOpen && <span>{item}</span>}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-700 rounded transition-colors"
            >
              ☰
            </button>
            <div>
              <h1 className="text-2xl font-bold">Trading Agent Dashboard</h1>
              <p className="text-sm text-gray-400">Real-time ML model monitoring and performance analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {/* Metrics Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <MetricsCard
              title="Model Accuracy"
              value={`${metrics.modelAccuracy}%`}
              change="+2.1%"
              icon="📊"
            />
            <MetricsCard
              title="Total Tests"
              value={metrics.totalTests}
              change="All phases"
              icon="✓"
            />
            <MetricsCard
              title="Success Rate"
              value={`${metrics.successRate}%`}
              change="+5.2%"
              icon="🎯"
            />
            <MetricsCard
              title="Avg Prediction Time"
              value={`${metrics.avgPredictionTime}ms`}
              change="-8.3%"
              icon="⚡"
            />
          </div>

          {/* Charts Grid - Responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Model Performance Chart */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h2 className="text-lg font-semibold mb-4">Model Performance Over Phases</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={phaseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #444' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#0086cc"
                    dot={{ fill: '#00cc99', r: 5 }}
                    activeDot={{ r: 7 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Feature Importance Chart */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h2 className="text-lg font-semibold mb-4">Feature Importance</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={featureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #444' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="value" fill="#00cc99" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Feature Distribution Pie Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h2 className="text-lg font-semibold mb-4">Feature Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={featureData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {featureData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #444' }}
                    labelStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Accuracy Trend */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h2 className="text-lg font-semibold mb-4">Accuracy Trend</h2>
              <div className="space-y-3">
                {phaseData.map((phase, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-16">{phase.name}</span>
                    <div className="flex-1 bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full"
                        style={{ width: `${phase.accuracy}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-300 w-12 text-right">{phase.accuracy}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ML Pipeline Table */}
          <TestPhases />
        </main>
      </div>
    </div>
  );
}
