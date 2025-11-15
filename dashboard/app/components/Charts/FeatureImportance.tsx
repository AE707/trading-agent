export default function FeatureImportanceChart() {
  const features = [
    { name: 'Moving Average', importance: 92 },
    { name: 'RSI', importance: 85 },
    { name: 'Price Momentum', importance: 78 },
    { name: 'Volume', importance: 72 },
    { name: 'MACD', importance: 68 },
  ];

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-white mb-6">Feature Importance</h3>
      <div className="space-y-4">
        {features.map((feature) => (
          <div key={feature.name}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">{feature.name}</span>
              <span className="text-sm font-medium text-blue-400">{feature.importance}%</span>
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                style={{ width: `${feature.importance}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
