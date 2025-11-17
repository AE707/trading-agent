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
import MarketTicker from './components/MarketTicker';
import TradeStatusBadge from './components/TradeStatusBadge';
import TimePeriodToggle from './components/TimePeriodToggle';
import SparklineCard from './components/SparklineCard';
import PortfolioPieChart from './components/PortfolioPieChart';

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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-gray-100">
      {/* Mobile-optimized Sidebar */}
      <div
        className={`fixed md:relative z-50 h-screen bg-slate-800 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-0 md:w-0'
        }`}
      >
        <aside className="hidden md:flex flex-col gap-3">
          <nav className="space-y-2">
            {['Overview', 'Metrics', 'Predictions', 'Trades', 'Analytics', 'Settings'].map((item) => (
              <div
                key={item}
                className="px-4 py-2 rounded hover:bg-slate-700 cursor-pointer transition-colors"
              >
                {item}
              </div>
            ))}
          </nav>
        </aside>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
        {/* Header */}
        <header className="sticky top-16 z-30 bg-slate-800/95 backdrop-blur border-b border-slate-700 p-4">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-700 rounded transition-colors flex-shrink-0"
            >
              ☰
            </button>
            <div className="min-w-0 overflow-hidden">
              <h1 className="text-lg sm:text-2xl font-bold truncate">Trading Agent</h1>
              <p className="text-xs sm:text-sm text-gray-400 truncate">ML Dashboard</p>
            </div>
          </div>
        </header>

        {/* Notification Center */}
        <NotificationCenter />

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Metrics Grid - Mobile First */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-3">
            <MetricsCard
              title="Accuracy"
              value={`${metrics.modelAccuracy}%`}
              change="+2.1%"
              icon="📊"
            />
            <MetricsCard
              title="Tests"
              value={metrics.totalTests}
              change="All"
              icon="📋"
            />
            <MetricsCard
              title="Success"
              value={`${metrics.successRate}%`}
              change="+5.2%"
              icon="✅"
            />
            <MetricsCard
              title="Time"
              value={`${metrics.avgPredictionTime}ms`}
              change="-8.3%"
              icon="⏱️"
            />
          </div>

          {/* Charts Grid - Responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-3">
            {/* Performance Chart */}
            <div className="bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-700 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-sm sm:text-lg font-semibold mb-3 sm:mb-4">Performance</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={phaseData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#999" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#999" tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #444', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="accuracy" stroke="#0086cc" dot={{ fill: '#00cc99', r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Features Chart */}
            <div className="bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-700 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-sm sm:text-lg font-semibold mb-3 sm:mb-4">Features</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={featureData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#999" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#999" tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #444', borderRadius: '8px' }} />
                  <Bar dataKey="value" fill="#00cc99" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Row - Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-3">
            {/* Distribution Chart */}
            <div className="bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-700 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-sm sm:text-lg font-semibold mb-3 sm:mb-4">Distribution</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart data={featureData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                  <Pie
                    data={featureData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#888848"
                    dataKey="value"
                    {featureData.map((_, index) => <Cell key={`index`} fill={COLORS[index % COLORS.length]} />)}
                  />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #444', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Trend Chart */}
            <div className="bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-700 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-sm sm:text-lg font-semibold mb-3 sm:mb-4">Trend</h2>
              <div className="space-y-2 sm:space-y-3">
                {phaseData.map((phase, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                    <span className="flex-1 bg-slate-700 h-2 rounded-full overflow-hidden min-w-0">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full overflow-hidden min-w-0"
                        style={{ width: `${phase.accuracy}%` }}
                      />
                    </span>
                    <span className="text-gray-300 w-10 text-right flex-shrink-0">{phase.accuracy}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Wins - Enhanced Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-3 mb-6">
            <AreaChartComponent />
            <StackedChartComponent />
            <ComposedChartComponent />
          </div>

          {/* Export & Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={() => exportToCSV(filteredPipeline, 'ml-pipeline.csv')}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex-shrink-0"
            >
              📊 Export CSV
            </button>
            <button
              onClick={() => exportToPDF(filteredPipeline, 'ML Pipeline Results')}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              📄 Export PDF
            </button>

            <ColumnManager
              columns={[
                { id: 'phase', label: 'Phase', visible: true },
                { id: 'accuracy', label: 'Accuracy', visible: true },
                { id: 'tests', label: 'Total Tests', visible: true },
                { id: 'success', label: 'Success Rate', visible: true },
              ]}
              onColumnChange={() => {}}
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-3 mb-6">
            <TableFilter
              data={filteredPipeline}
              searchableFields={['name', 'accuracy']}
              onFilterChange={setFilteredPipeline}
            />
            <DateRangeFilter
              onDateRangeChange={(start, end) => {
                setStartDate(start);
                setEndDate(end);
              }}
            />
          </div>

          {/* ML Pipeline Table */}
          <div className="bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-700 shadow-lg overflow-hidden">
            <TestPhases />
          </div>

          {/* Advanced Analytics Dashboard */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Advanced Analytics</h2>
            <AdvancedMetrics />
          </div>
        </div>
      </main>
    </div>
  );
}
