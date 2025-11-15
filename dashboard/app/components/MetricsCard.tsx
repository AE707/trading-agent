interface MetricsCardProps {
  title: string;
  value: string;
  trend: 'up' | 'down';
  change: string;
  icon: string;
}

export default function MetricsCard({ title, value, trend, change, icon }: MetricsCardProps) {
  const trendColor = trend === 'up' ? 'text-green-400' : 'text-red-400';
  
  return (
    <div className="card hover:shadow-2xl transform hover:-translate-y-1 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
      <div className={`text-sm ${trendColor} font-medium`}>
        {trend === 'up' ? '↑' : '↓'} {change}
      </div>
    </div>
  );
}
