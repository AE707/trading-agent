'use client';

interface MetricCardProps {
  label: string;
  value: string | number;
  change: string;
  icon: string;
  isPositive: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  icon,
  isPositive,
}) => (
  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700 p-6 hover:border-cyan-500/50 transition-colors">
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
        {label}
      </span>
      <span className="text-2xl">{icon}</span>
    </div>
    <div className="mb-4">
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <div
        className={`text-sm font-semibold flex items-center gap-1 ${
          isPositive ? 'text-green-400' : 'text-red-400'
        }`}
      >
        <span>{isPositive ? '📈' : '📉'}</span>
        <span>{change}</span>
      </div>
    </div>
  </div>
);

export default function PerformanceMetrics() {
  const metrics = [
    {
      label: 'Accuracy',
      value: '73.42%',
      change: '+2.1%',
      icon: '🎯',
      isPositive: true,
    },
    {
      label: 'Tests',
      value: '7',
      change: '+2 new',
      icon: '🧪',
      isPositive: true,
    },
    {
      label: 'Success',
      value: '85.71%',
      change: '+5.2%',
      icon: '✅',
      isPositive: true,
    },
    {
      label: 'Time',
      value: '142ms',
      change: '-8.3%',
      icon: '⏱️',
      isPositive: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((metric, idx) => (
        <MetricCard key={idx} {...metric} />
      ))}
    </div>
  );
}
