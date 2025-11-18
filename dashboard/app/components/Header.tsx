'use client';

import { useState, useEffect } from 'react';

interface MarketPrice {
  symbol: string;
  price: number;
  change: number;
}

interface HeaderProps {
  onNavigate?: (section: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([
    { symbol: 'BTC', price: 43250.50, change: 2.45 },
    { symbol: 'ETH', price: 2280.75, change: -1.23 },
    { symbol: 'XRP', price: 0.52, change: 3.12 },
  ]);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navigationItems = [
    { label: 'Overview', href: '/', icon: '📊' },
    { label: 'Metrics', href: '/#metrics', icon: '📈' },
    { label: 'Predictions', href: '/#predictions', icon: '🤖' },
    { label: 'Trades', href: '/#trades', icon: '💹' },
    { label: 'Analytics', href: '/#analytics', icon: '📉' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-700 shadow-lg">
      {/* Main Header Container */}
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo and Branding Section */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 group cursor-pointer transition-transform hover:scale-105">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg group-hover:shadow-cyan-500/50 transition-shadow">
              🤖
            </div>
            <div className="hidden md:flex flex-col">
              <h1 className="text-lg font-extrabold text-white tracking-tight">Trading Agent</h1>
              <p className="text-xs text-cyan-400 font-medium">ML Pipeline Dashboard v1.0.0</p>
            </div>
          </div>
        </div>

        {/* Center Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {navigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate(item.label);
                }
              }}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-cyan-400 hover:bg-slate-800/60 rounded-lg transition-all duration-200 flex items-center gap-2 group"
              title={`Navigate to ${item.label}`}
            >
              <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Section: Status and Time */}
        <div className="flex items-center gap-3">
          {/* Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 rounded-full border border-slate-600 backdrop-blur-sm hover:border-cyan-500/50 transition-colors">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-green-400">Live</span>
          </div>

          {/* Time Display */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 rounded-full border border-slate-600 backdrop-blur-sm">
            <span className="text-xs text-cyan-400">⏰</span>
            <span className="text-sm font-mono text-gray-300">{currentTime}</span>
          </div>
        </div>
      </div>

      {/* Market Ticker Section */}
      <div className="bg-slate-800/40 border-t border-slate-700 px-6 py-3 overflow-x-auto scrollbar-hide">
        <div className="flex gap-8 min-w-min">
          {marketPrices.map((market, idx) => (
            <div
              key={market.symbol}
              className="flex items-center gap-4 whitespace-nowrap py-1 px-3 rounded-lg hover:bg-slate-700/50 transition-colors group"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  {market.symbol}
                </span>
                <span className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                  ${market.price.toFixed(2)}
                </span>
              </div>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-sm transition-all group-hover:scale-105 ${
                  market.change >= 0
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}
              >
                <span>{market.change >= 0 ? '📈' : '📉'}</span>
                <span>{Math.abs(market.change).toFixed(2)}%</span>
              </span>
              {idx < marketPrices.length - 1 && (
                <div className="w-px h-6 bg-slate-600/50 group-hover:bg-slate-500"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
