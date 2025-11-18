'use client';

import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PerformanceMetrics from './components/PerformanceMetrics';

const performanceChartData = [
  { phase: 'P1', accuracy: 68, f1: 65, precision: 70 },
  { phase: 'P2', accuracy: 70, f1: 68, precision: 72 },
  { phase: 'P3', accuracy: 71, f1: 70, precision: 73 },
  { phase: 'P4', accuracy: 72, f1: 71, precision: 74 },
  { phase: 'P5', accuracy: 72.5, f1: 71.5, precision: 74.5 },
  { phase: 'P6', accuracy: 73.42, f1: 72, precision: 75 },
];

const featuresData = [
  { name: 'Avg', value: 85 },
  { name: 'RSI', value: 78 },
  { name: 'Mom', value: 92 },
  { name: 'Vol', value: 88 },
  { name: 'MACD', value: 81 },
];

const distributionData = [
  { name: 'Segment 1', value: 25, color: '#06b6d4' },
  { name: 'Segment 2', value: 20, color: '#0891b2' },
  { name: 'Segment 3', value: 22, color: '#fbbf24' },
  { name: 'Segment 4', value: 18, color: '#ec4899' },
  { name: 'Segment 5', value: 15, color: '#a5f3fc' },
];

const mlPipelinePhases = [
  { phase: 'P1', status: 'Completed', accuracy: 78, f1: 76, precision: 80 },
  { phase: 'P2', status: 'Completed', accuracy: 81, f1: 79, precision: 83 },
  { phase: 'P3', status: 'Completed', accuracy: 84, f1: 82, precision: 86 },
  { phase: 'P4', status: 'Completed', accuracy: 87, f1: 85, precision: 89 },
  { phase: 'P5', status: 'Completed', accuracy: 90, f1: 88, precision: 92 },
  { phase: 'P6', status: 'In Progress', accuracy: 92, f1: 90, precision: 94 },
  { phase: 'P7', status: 'Pending', accuracy: 95, f1: 93, precision: 96 },
];

const advancedMetrics = [
  { label: 'Overall Accuracy', value: 95, change: '+5%', icon: '🎯' },
  { label: 'F1 Score', value: 93, change: '+3%', icon: '📊' },
  { label: 'Precision', value: 96, change: '+2%', icon: '✅' },
  { label: 'Recall', value: 91, change: '+4%', icon: '🔍' },
];

export default function Dashboard() {
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-11-18');

  const getStatusColor = (status: string) => {
    if (status === 'Completed') return 'text-green-400';
    if (status === 'In Progress') return 'text-yellow-400';
    return 'text-gray-400';
  };

  const getStatusBg = (status: string) => {
    if (status === 'Completed') return 'bg-green-500/20';
    if (status === 'In Progress') return 'bg-yellow-500/20';
    return 'bg-gray-500/20';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="mb-8"><h1 className="text-3xl font-bold text-white mb-2">AI Trading Agent Dashboard</h1><p className="text-gray-400">ML Pipeline Performance & Analytics</p></div>
      <PerformanceMetrics />
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4 mb-8"><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"><input type="text" placeholder="Search metrics..." className="bg-slate-900 border border-slate-600 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none" /><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-slate-900 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none" /><input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-slate-900 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none" /></div><div className="flex flex-wrap gap-2"><button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded text-sm font-semibold">📥 CSV</button><button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded text-sm font-semibold">📄 PDF</button><span className="text-gray-400 text-sm self-center ml-auto">Showing 6 of 6</span></div></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6"><h3 className="text-lg font-bold text-white mb-4">Performance Chart</h3><ResponsiveContainer width="100%" height={300}><LineChart data={performanceChartData}><CartesianGrid stroke="#334155" /><XAxis dataKey="phase" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip contentStyle={{ backgroundColor: '#1e293b' }} /><Legend /><Line dataKey="accuracy" stroke="#0ea5e9" strokeWidth={2} /><Line dataKey="f1" stroke="#10b981" strokeWidth={2} /><Line dataKey="precision" stroke="#f59e0b" strokeWidth={2} /></LineChart></ResponsiveContainer></div><div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6"><h3 className="text-lg font-bold text-white mb-4">Features Chart</h3><ResponsiveContainer width="100%" height={300}><BarChart data={featuresData}><CartesianGrid stroke="#334155" /><XAxis dataKey="name" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip contentStyle={{ backgroundColor: '#1e293b' }} /><Bar dataKey="value" fill="#06b6d4" /></BarChart></ResponsiveContainer></div></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6"><h3 className="text-lg font-bold text-white mb-4">Distribution</h3><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={distributionData} cx="50%" cy="50%" outerRadius={100} dataKey="value">{distributionData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie></PieChart></ResponsiveContainer></div><div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6"><h3 className="text-lg font-bold text-white mb-4">Accuracy Over Time</h3><ResponsiveContainer width="100%" height={300}><AreaChart data={performanceChartData}><CartesianGrid stroke="#334155" /><XAxis dataKey="phase" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Area type="monotone" dataKey="accuracy" fill="#0ea5e9" /></AreaChart></ResponsiveContainer></div></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"><div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6"><h3 className="text-lg font-bold text-white mb-4">Accuracy vs Loss</h3><ResponsiveContainer width="100%" height={300}><BarChart data={performanceChartData}><CartesianGrid stroke="#334155" /><XAxis dataKey="phase" stroke="#94a3b8" /><Bar dataKey="accuracy" fill="#10b981" /><Bar dataKey="f1" fill="#ef4444" /></BarChart></ResponsiveContainer></div><div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6"><h3 className="text-lg font-bold text-white mb-4">Performance Metrics</h3><ResponsiveContainer width="100%" height={300}><ComposedChart data={performanceChartData}><CartesianGrid stroke="#334155" /><XAxis dataKey="phase" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Area type="monotone" dataKey="accuracy" fill="#0ea5e9" /><Bar dataKey="f1" fill="#fbbf24" /></ComposedChart></ResponsiveContainer></div></div>
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6 mb-6"><h3 className="text-lg font-bold text-white mb-4">Phases Performance</h3><ResponsiveContainer width="100%" height={300}><LineChart data={performanceChartData}><CartesianGrid stroke="#334155" /><XAxis dataKey="phase" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Legend /><Line dataKey="accuracy" stroke="#0ea5e9" strokeWidth={2} /><Line dataKey="f1" stroke="#10b981" strokeWidth={2} /><Line dataKey="precision" stroke="#f59e0b" strokeWidth={2} /></LineChart></ResponsiveContainer></div>
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6 mb-6"><h3 className="text-lg font-bold text-white mb-4">ML Pipeline Phases</h3><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-slate-600"><th className="text-left px-4 py-3 font-semibold text-gray-300">Phase</th><th className="text-left px-4 py-3 font-semibold text-gray-300">Status</th><th className="text-left px-4 py-3 font-semibold text-gray-300">Accuracy</th><th className="text-left px-4 py-3 font-semibold text-gray-300">F1 Score</th><th className="text-left px-4 py-3 font-semibold text-gray-300">Precision</th></tr></thead><tbody>{mlPipelinePhases.map((p) => (<tr key={p.phase} className="border-b border-slate-700 hover:bg-slate-700/50"><td className="px-4 py-3 text-white font-semibold">{p.phase}</td><td className={`px-4 py-3 font-semibold ${getStatusColor(p.status)}`}><span className={`px-2 py-1 rounded text-xs ${getStatusBg(p.status)}`}>{p.status}</span></td><td className="px-4 py-3 text-cyan-400">{p.accuracy}%</td><td className="px-4 py-3 text-green-400">{p.f1}%</td><td className="px-4 py-3 text-yellow-400">{p.precision}%</td></tr>))}</tbody></table></div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">{advancedMetrics.map((m) => (<div key={m.label} className="bg-slate-800/50 rounded-lg border border-slate-700 p-6"><div className="flex justify-between items-center mb-4"><span className="text-gray-400 text-sm font-semibold">{m.label}</span><span className="text-2xl">{m.icon}</span></div><div className="text-3xl font-bold text-white mb-2">{m.value}%</div><div className="text-green-400 text-sm font-semibold">{m.change}</div></div>))}</div>
    </div>
  );
}
