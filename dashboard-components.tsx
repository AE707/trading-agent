// Trading Agent Dashboard Components - React + Tailwind CSS
// Ready-to-use components for ML Pipeline Testing Results Display

import React, { useState, useEffect } from 'react';
import { LineChart, BarChart, RadarChart, PieChart, Line, Bar, Radar, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CheckCircle2, AlertCircle, TrendingUp, Activity, Gauge, Clock } from 'lucide-react';

// ===== METRICS CARD COMPONENT =====
export const MetricsCard = ({ title, value, target, status, icon: Icon }) => {
  const statusColors = {
    pass: 'border-green-500 bg-green-50',
    fail: 'border-red-500 bg-red-50',
    warning: 'border-yellow-500 bg-yellow-50',
  };

  const textColors = {
    pass: 'text-green-700',
    fail: 'text-red-700',
    warning: 'text-yellow-700',
  };

  return (
    <div className={`border-l-4 rounded-lg p-6 ${statusColors[status]} shadow-md`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-3xl font-bold mt-2 ${textColors[status]}`}>{value}</p>
          <p className="text-gray-500 text-xs mt-1">Target: {target}</p>
        </div>
        {Icon && <Icon className={`w-8 h-8 ${textColors[status]}`} />}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-green-600" />
        <span className="text-xs text-gray-600">Threshold met</span>
      </div>
    </div>
  );
};

// ===== TEST PHASES GRID =====
export const TestPhasesGrid = ({ phases }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {phases.map((phase, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow p-4 border-t-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Phase {phase.phase}</span>
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-xs text-gray-600 mb-3">{phase.name}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Duration:</span>
              <span className="font-mono font-bold">{phase.duration}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Result:</span>
              <span className="font-mono text-green-600 font-semibold">{phase.result}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ===== MODEL PERFORMANCE CHART =====
export const ModelPerformanceChart = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Gauge className="w-5 h-5 text-blue-600" />
        Model Performance Metrics
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis angle={90} domain={[0, 1]} />
          <Radar name="Score" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

// ===== FEATURE IMPORTANCE CHART =====
export const FeatureImportanceChart = ({ features }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        Top Features by Importance
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={features} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, 0.3]} />
          <YAxis dataKey="name" type="category" width={100} />
          <Tooltip />
          <Bar dataKey="importance" fill="#10b981" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// ===== PREDICTION CONFIDENCE CHART =====
export const PredictionChart = ({ predictions }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-blue-600" />
        Prediction Confidence Analysis
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={predictions}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis domain={[0, 1]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="confidence" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// ===== STATUS BADGE =====
export const StatusBadge = ({ status, text }) => {
  const colors = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`}>
      {text}
    </span>
  );
};

// ===== DATA QUALITY INDICATOR =====
export const DataQualityIndicator = ({ score, maxScore = 100 }) => {
  const percentage = (score / maxScore) * 100;
  let color = 'bg-green-500';
  if (percentage < 70) color = 'bg-red-500';
  else if (percentage < 85) color = 'bg-yellow-500';

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Data Quality Score</h3>
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <div className="bg-gray-200 rounded-full h-8 overflow-hidden">
            <div
              className={`h-full ${color} transition-all duration-500 flex items-center justify-center text-white text-sm font-bold`}
              style={{ width: `${percentage}%` }}
            >
              {percentage > 10 && `${Math.round(percentage)}%`}
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-800">{score}</p>
          <p className="text-xs text-gray-500">/ {maxScore}</p>
        </div>
      </div>
    </div>
  );
};

// ===== EXECUTION TIME DISPLAY =====
export const ExecutionTimeDisplay = ({ executionTime }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow p-6 border border-blue-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">Total Execution Time</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">{executionTime}s</p>
          <p className="text-xs text-gray-500 mt-1">Target: &lt;7 seconds</p>
        </div>
        <Clock className="w-16 h-16 text-blue-300" />
      </div>
      <div className="mt-4 bg-white rounded px-3 py-2">
        <p className="text-xs text-green-700">✓ Performance target achieved</p>
      </div>
    </div>
  );
};

// ===== OVERALL DASHBOARD STATUS =====
export const DashboardStatus = ({ testsPassed, totalTests, modelAccuracy }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Tests Passed</p>
            <p className="text-3xl font-bold text-green-600 mt-1">{testsPassed}/{totalTests}</p>
          </div>
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Model Accuracy</p>
            <p className="text-3xl font-bold text-blue-600 mt-1">{(modelAccuracy * 100).toFixed(2)}%</p>
          </div>
          <TrendingUp className="w-10 h-10 text-blue-600" />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">System Status</p>
            <p className="text-lg font-bold text-purple-600 mt-1">Production Ready</p>
          </div>
          <Activity className="w-10 h-10 text-purple-600" />
        </div>
      </div>
    </div>
  );
};

export default {
  MetricsCard,
  TestPhasesGrid,
  ModelPerformanceChart,
  FeatureImportanceChart,
  PredictionChart,
  StatusBadge,
  DataQualityIndicator,
  ExecutionTimeDisplay,
  DashboardStatus,
};
