'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import MetricsCard from './components/MetricsCard';
import TestPhases from './components/TestPhases';
import { AreaChartComponent, StackedChartComponent, ComposedChartComponent } from './components/EnhancedCharts';
import { exportToCSV, exportToPDF } from './components/ExportUtils';
import { TableFilter } from './components/TableFilter';
import { DateRangeFilter } from './components/DateRangeFilter';
import DraggableWidget from './components/DraggableWidget';
import { NotificationCenter } from './components/Notifications';
import ColumnManager from './components/ColumnManager';
import AdvancedMetrics from './components/AdvancedMetrics';

const phaseData = [
  { name: 'P1', accuracy: 68 },
  { name: 'P2', accuracy: 71 },
  { name: 'P3', accuracy: 72 },
  { name: 'P4', accuracy: 73 },
  { name: 'P5', accuracy: 73.2 },
  { name: 'P6', accuracy: 73.42 },
];

const featureData = [
  { name: 'Avg', value: 92 },
  { name: 'RSI', value: 85 },
  { name: 'Mom', value: 78 },
  { name: 'Vol', value: 72 },
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
    const [filteredPipeline, setFilteredPipeline] = useState(phaseData);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Mobile-optimized Sidebar */}
      <aside
        className={`fixed md:relative z-50 h-screen bg-gray-800 border-r border-gray-700 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-0 md:w-20'
        }`}
      >
        <div className="p-4 space-y-8 h-full overflow-y-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded"></div>
            {sidebarOpen && <span className="font-bold text-lg hidden md:inline">TA</span>}
          </div>
          <nav className="space-y-2">
            {['Overview', 'Metrics', 'Predictions', 'Features', 'Settings'].map((item) => (
              <div key={item} className="px-4 py-2 rounded hover:bg-gray-700 cursor-pointer transition-colors text-sm md:text-base">
                {sidebarOpen && <span>{item}</span>}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto w-full">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 p-3 sm:p-4 flex items-center justify-between sticky top-0 z-40 flex-shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-700 rounded transition-colors flex-shrink-0"
            >
              ☰
            </button>
            <div className="min-w-0 overflow-hidden">
              <h1 className="text-lg sm:text-2xl font-bold truncate">Trading Agent</h1>
              <p className="text-xs sm:text-sm text-gray-400 truncate">ML Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm flex-shrink-0">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
            <NotificationCenter />

        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-3 sm:p-4 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Metrics Grid - Mobile First */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
            <MetricsCard title="Accuracy" value={`${metrics.modelAccuracy}%`} change="+2.1%" icon="📊" />
            <MetricsCard title="Tests" value={metrics.totalTests} change="All" icon="✓" />
            <MetricsCard title="Success" value={`${metrics.successRate}%`} change="+5.2%" icon="🎯" />
            <MetricsCard title="Time" value={`${metrics.avgPredictionTime}ms`} change="-8.3%" icon="⚡" />
          </div>

          {/* Charts Grid - Responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            {/* Model Performance */}
            <div className="bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-700 overflow-hidden">
              <h2 className="text-sm sm:text-lg font-semibold mb-3 sm:mb-4">Performance</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={phaseData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#999" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#999" tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #444', borderRadius: '4px' }} />
                  <Line type="monotone" dataKey="accuracy" stroke="#0086cc" dot={{ fill: '#00cc99', r: 3 }} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Feature Importance */}
            <div className="bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-700 overflow-hidden">
              <h2 className="text-sm sm:text-lg font-semibold mb-3 sm:mb-4">Features</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={featureData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#999" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#999" tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #444', borderRadius: '4px' }} />
                  <Bar dataKey="value" fill="#00cc99" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Row - Pie & Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            {/* Distribution */}
            <div className="bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-700 overflow-hidden">
              <h2 className="text-sm sm:text-lg font-semibold mb-3 sm:mb-4">Distribution</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={featureData} cx="50%" cy="50%" outerRadius={60} fill="#8884d8" dataKey="value" label={{ fontSize: 12 }}>
                    {featureData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #444', borderRadius: '4px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Trend */}
            <div className="bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-700 overflow-hidden">
              <h2 className="text-sm sm:text-lg font-semibold mb-3 sm:mb-4">Trend</h2>
              <div className="space-y-2 sm:space-y-3">
                {phaseData.map((phase, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                    <span className="font-medium w-10 flex-shrink-0">{phase.name}</span>
                    <div className="flex-1 bg-gray-700 h-2 rounded-full overflow-hidden min-w-0">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full" style={{ width: `${phase.accuracy}%` }} />
                    </div>
                    <span className="text-gray-300 w-10 text-right flex-shrink-0">{phase.accuracy}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        {/* Quick Wins - Enhanced Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <AreaChartComponent />
          <StackedChartComponent />
          <ComposedChartComponent />
        </div>

        {/* Export & Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => exportToCSV(filteredPipeline, 'ml-pipeline.csv')}
            className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
          >
            📥 Export CSV
          </button>
          <button
            onClick={() => exportToPDF(filteredPipeline, 'ml-pipeline.pdf', 'ML Pipeline Results')}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            📄 Export PDF
          </button>
          
                <ColumnManager columns={[
                  { id: 'phase', label: 'Phase', visible: true },
                  { id: 'accuracy', label: 'Accuracy', visible: true },
                  { id: 'tests', label: 'Total Tests', visible: true },
                  { id: 'success', label: 'Success Rate', visible: true },
                ]} onColumnChange={() => {}} />

        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <TableFilter data={filteredPipeline} searchableFields={['name', 'accuracy']} onFilterChange={setFilteredPipeline} />
          <DateRangeFilter onDateRangeChange={(start, end) => { setStartDate(start); setEndDate(end); }} />
        </div>

          {/* ML Pipeline Table */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <TestPhases />
          </div>

            {/* Advanced Analytics Dashboard */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Advanced Analytics</h2>
              <AdvancedMetrics />
            </div>

        </main>
      </div>
    </div>
  );
}
