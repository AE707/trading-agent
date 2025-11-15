export default function TestPhases() {
  const phases = [
    { phase: 1, name: 'Data Collection', status: 'completed', accuracy: '68%' },
    { phase: 2, name: 'Feature Engineering', status: 'completed', accuracy: '71%' },
    { phase: 3, name: 'Model Training', status: 'completed', accuracy: '72%' },
    { phase: 4, name: 'Cross Validation', status: 'completed', accuracy: '73%' },
    { phase: 5, name: 'Hyperparameter Tuning', status: 'completed', accuracy: '73.2%' },
    { phase: 6, name: 'Model Testing', status: 'completed', accuracy: '73.42%' },
    { phase: 7, name: 'Deployment Ready', status: 'completed', accuracy: '73.42%' },
  ];

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-white mb-6">ML Pipeline Test Phases</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 px-4 text-gray-400 font-semibold">Phase</th>
              <th className="text-left py-3 px-4 text-gray-400 font-semibold">Name</th>
              <th className="text-left py-3 px-4 text-gray-400 font-semibold">Status</th>
              <th className="text-left py-3 px-4 text-gray-400 font-semibold">Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {phases.map((item) => (
              <tr key={item.phase} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                <td className="py-3 px-4 text-white font-medium">Phase {item.phase}</td>
                <td className="py-3 px-4 text-gray-300">{item.name}</td>
                <td className="py-3 px-4">
                  <span className="inline-block px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                    ✓ {item.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-blue-400 font-medium">{item.accuracy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
