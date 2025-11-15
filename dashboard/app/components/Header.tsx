'use client';

export default function Header() {
  return (
    <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white">
            TA
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Trading Agent</h2>
            <p className="text-sm text-gray-400">ML Pipeline Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-700 rounded-lg">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-sm text-green-400">Live</span>
          </div>
        </div>
      </div>
    </header>
  );
}
