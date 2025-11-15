'use client';

import { useEffect, useState } from 'react';
import MetricsCard from './components/MetricsCard';
import TestPhases from './components/TestPhases';
import ModelPerformanceChart from './components/Charts/ModelPerformance';
import FeatureImportanceChart from './components/Charts/FeatureImportance';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    modelAccuracy: 73.42,
    totalTests: 7,
    successRate: 85.71,
    avgPredictionTime: 142,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch metrics from API
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        // const response = await fetch('/api/metrics');
        // const data = await response.json();
        // setMetrics(data);
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Trading Agent Dashboard</h1>
        <p className="text-gray-400 mt-2">Real-time ML model monitoring and performance analytics</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Model Accuracy"
          value={`${metrics.modelAccuracy}%`}
          trend="up"
          change="+2.1%"
          icon="📊"
        />
        <MetricsCard
          title="Total Tests"
          value={metrics.totalTests.toString()}
          trend="up"
          change="All phases"
          icon="✓"
        />
        <MetricsCard
          title="Success Rate"
          value={`${metrics.successRate}%`}
          trend="up"
          change="+5.2%"
          icon="🎯"
        />
        <MetricsCard
          title="Avg Prediction Time"
          value={`${metrics.avgPredictionTime}ms`}
          trend="down"
          change="-8.3%"
          icon="⚡"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ModelPerformanceChart />
        <FeatureImportanceChart />
      </div>

      {/* Test Phases */}
      <TestPhases />
    </div>
  );
}
