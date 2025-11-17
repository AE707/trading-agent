'use client';

import Link from 'next/link';

const navigationItems = [
  { icon: '📊', href: '/', tooltip: 'Dashboard' },
  { icon: '👥', href: '#', tooltip: 'Users' },
  { icon: '📈', href: '#', tooltip: 'Analytics' },
  { icon: '🤖', href: '#', tooltip: 'Bots' },
  { icon: '💰', href: '#', tooltip: 'Wallet' },
  { icon: '⚙️', href: '#', tooltip: 'Settings' },
  { icon: '🔔', href: '#', tooltip: 'Notifications' },
];

const bottomItems = [
  { icon: '🌙', href: '#', tooltip: 'Theme' },
  { icon: '👤', href: '#', tooltip: 'Profile' },
];

export default function Sidebar() {
  return (
    <aside className="w-16 bg-slate-950 border-r border-slate-800 flex flex-col items-center justify-between py-6 sticky top-0 h-screen overflow-hidden">
      {/* Top Logo */}
      <div className="flex flex-col items-center gap-8">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/50 transition-all cursor-pointer">
          <span className="text-xl font-bold text-white">📱</span>
        </div>

        {/* Main Navigation */}
        <nav className="flex flex-col gap-2">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-12 h-12 rounded-lg flex items-center justify-center text-xl hover:bg-slate-800 hover:text-blue-400 transition-all duration-200 group relative text-slate-400"
              title={item.tooltip}
            >
              {item.icon}
              <span className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-slate-200 text-xs whitespace-nowrap rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium">
                {item.tooltip}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Navigation */}
      <nav className="flex flex-col gap-2">
        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="w-12 h-12 rounded-lg flex items-center justify-center text-xl hover:bg-slate-800 hover:text-blue-400 transition-all duration-200 group relative text-slate-400"
            title={item.tooltip}
          >
            {item.icon}
            <span className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-slate-200 text-xs whitespace-nowrap rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium">
              {item.tooltip}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
