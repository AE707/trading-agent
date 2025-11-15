export default function ModelPerformanceChart() {
  return (
    <div className="card">
      <h3 className="text-xl font-bold text-white mb-6">Model Performance Over Phases</h3>
      <div className="h-64 bg-slate-700/50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Model Accuracy Progression</p>
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-4">
              <span className="text-gray-400 w-20">Phase 1:</span>
              <div className="w-40 bg-slate-600 h-6 rounded" style={{width: '68px'}}>68%</div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 w-20">Phase 6:</span>
              <div className="w-40 bg-slate-600 h-6 rounded" style={{width: '73.42px'}}>73.42%</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-around text-sm text-gray-400">
        <div>Latest: 73.42%</div>
        <div>Improvement: +5.42%</div>
      </div>
    </div>
  );
}
