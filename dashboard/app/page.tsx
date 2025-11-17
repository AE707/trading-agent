'use client';

import { useState } from 'react';
import { BarChart, Bar, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const profitData = [
  { month: 'Jan', value: 26150 },
  { month: 'Feb', value: 30100 },
  { month: 'Mar', value: 34700 },
  { month: 'Apr', value: 39900 },
  { month: 'May', value: 45870 },
  { month: 'Jun', value: 52750 },
];

const recentTrades = [
  { pair: 'BTC/USDT', profit: 3540, positive: true },
  { pair: 'ETH/USDT', profit: 2340, positive: true },
  { pair: 'SOL/USDT', profit: -1340, positive: false },
  { pair: 'BNB/USDT', profit: 1240, positive: true },
];

const topBots = [
  { name: 'BTC Scalper', profit: 5240, winRate: '87%' },
  { name: 'ETH DCA Master', profit: 3980, winRate: '92%' },
];

const walletData = [
  { symbol: 'Bitcoin', amount: 0.76, usd: 32400, change: '+12.5%' },
  { symbol: 'Ethereum', amount: 2.14, usd: 8240, change: '+8.2%' },
  { symbol: 'Solana', amount: 32.5, usd: 3450, change: '+24.1%' },
];

export default function Dashboard() {
  const [timePeriod, setTimePeriod] = useState('monthly');

  return (
    <div className="flex-1 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 overflow-auto">
      {/* Header */}
      <header className="bg-slate-900/50 border-b border-slate-800 sticky top-0 z-50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-80">
              <input
                type="text"
                placeholder="Search markets, assets..."
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-2.5 text-slate-500 text-sm">⌘ K</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">🌙</button>
            <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors relative">🔔<span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span></button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">Connect Wallet</button>
            <div className="flex items-center gap-2 pl-4 border-l border-slate-700">
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500"></span>
              <span className="text-sm text-slate-200">Ayaan Zafar ▼</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 text-sm">Total Balance</span>
              <span className="text-2xl">$</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">$45,231.89</div>
            <div className="text-green-400 text-sm">+20.1% from last month</div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 text-sm">Active Bots</span>
              <span className="text-2xl">👥</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">+12</div>
            <div className="text-green-400 text-sm">+2 since last login</div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 text-sm">Total Profit</span>
              <span className="text-2xl">💼</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">+$12,234</div>
            <div className="text-green-400 text-sm">+19% from last month</div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 text-sm">Active Trades</span>
              <span className="text-2xl">📊</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">+573</div>
            <div className="text-green-400 text-sm">+201 since yesterday</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Profit Chart */}
          <div className="col-span-2 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Profit Chart</h3>
              <div className="flex gap-2">
                {['Daily', 'Weekly', 'Monthly'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimePeriod(period.toLowerCase())}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      timePeriod === period.toLowerCase()
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={profitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Trades */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Recent Trades</h3>
            <p className="text-slate-400 text-sm mb-4">You made 265 trades this month.</p>
            <div className="space-y-3">
              {recentTrades.map((trade, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className={trade.positive ? '🟢' : '🔴'}></span>
                    <span className="text-white">{trade.pair}</span>
                  </div>
                  <span className={trade.positive ? 'text-green-400' : 'text-red-400'}>
                    {trade.positive ? '+' : ''}
                    ${trade.profit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Top Performing Bots */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Top Performing Bots</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 text-slate-400 text-sm">Bot Name</th>
                    <th className="text-right py-2 text-slate-400 text-sm">Profit</th>
                    <th className="text-right py-2 text-slate-400 text-sm">Win Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {topBots.map((bot, idx) => (
                    <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                      <td className="py-3 text-white">{bot.name}</td>
                      <td className="text-right text-green-400">+${bot.profit}</td>
                      <td className="text-right text-slate-300">{bot.winRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Wallet Overview */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Wallet Overview</h3>
            <div className="space-y-3">
              {walletData.map((asset, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div>
                    <div className="text-white font-medium">{asset.symbol}</div>
                    <div className="text-slate-400 text-sm">{asset.amount} {asset.symbol.split(' ')[0]}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">${asset.usd}</div>
                    <div className={`text-sm ${asset.change.includes('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {asset.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
