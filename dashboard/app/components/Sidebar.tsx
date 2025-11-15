'use client';

import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-700 p-6 flex flex-col h-screen">
      {/* Logo */}
      <div className="mb-8 pb-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <Link href="/" className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors block">
          Overview
        </Link>
        <Link href="#" className="w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 transition-colors block">
          Metrics
        </Link>
        <Link href="#" className="w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 transition-colors block">
          Predictions
        </Link>
        <Link href="#" className="w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 transition-colors block">
          Features
        </Link>
        <Link href="#" className="w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 transition-colors block">
          Settings
        </Link>
      </nav>

      {/* Footer */}
      <div className="pt-6 border-t border-slate-700 text-xs text-gray-400">
        <p>v1.0.0</p>
        <p className="mt-1">ML Trading Agent</p>
      </div>
    </aside>
  );
}
