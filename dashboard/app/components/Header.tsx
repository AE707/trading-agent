'use client';

import { useState, useEffect } from 'react';

interface MarketPrice {
  symbol: string;
  price: number;
  change: number;
}

export default function Header() {
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([
    { symbol: 'BTC', price: 43250.50, change: 2.45 },
    { symbol: 'ETH', price: 2280.75, change: -1.23 },
    { symbol: 'XRP', price: 0.52, change: 3.12 },
  ]);

  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 shadow-lg">
      {/* Main Header Container */}
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo and Branding Section */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">
              🤖
            </div>
            <div className="hidden md:flex flex-col">
              <h1 className="text-lg font-bold text-white">Trading Agent</h1>
              <p className="text-xs text-gray-400">ML Pipeline Dashboard</p>
            </div>
          </div>
        </div>

        {/* Center Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {[
            { label: 'Overview', href: '/' },
            { label: 'Metrics', href: '/#metrics' },
            { label: 'Predictions', href: '/#predictions' },
            { label: 'Trades', href: '/#trades' },
            { label: 'Analytics', href: '/#analytics' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Section: Status and Time */}
        <div className="flex items-center gap-4">
          {/* Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-full border border-slate-700">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-green-400">Live</span>
          </div>

          {/* Time Display */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-full border border-slate-700">
            <span className="text-xs text-gray-400">⏰</span>
            <span className="text-sm font-medium text-gray-300">{currentTime}</span>
          </div>

          {/* Version Badge */}
          <div className="hidden md:flex items-center px-3 py-1.5 bg-blue-900/30 rounded-full border border-blue-700/50">
            <span className="text-xs font-semibold text-blue-300">v1.0.0</span>
          </div>
        </div>
      </div>

      {/* Market Ticker Section */}
      <div className="bg-slate-800/50 border-t border-slate-700 px-6 py-3 overflow-x-auto scrollbar-hide">
        <div className="flex gap-8 min-w-min">
          {marketPrices.map((market) => (
            <div key={market.symbol} className="flex items-center gap-3 whitespace-nowrap">
              <span className="text-sm font-semibold text-white">{market.symbol}</span>
              <span className="text-sm font-bold text-gray-100">${market.price.toFixed(2)}</span>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${
                market.change >= 0
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {market.change >= 0 ? '📈' : '📉'} {Math.abs(market.change)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
