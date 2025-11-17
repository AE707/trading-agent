'use client';

import { useState } from 'react';
import { BarChart, Bar, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './dashboard.css';

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
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="search-section">
            <input
              type="text"
              placeholder="Search markets, assets..."
              className="search-input"
            />
            <span className="search-hint">⌘ K</span>
          </div>
          <div className="header-actions">
            <button className="header-btn">🌙</button>
            <button className="header-btn notification-btn">🔔<span className="notification-badge"></span></button>
            <button className="connect-wallet-btn">Connect Wallet</button>
            <div className="user-profile">
              <span className="profile-avatar"></span>
              <span className="profile-name">Ayaan Zafar ▼</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Metric Cards */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Total Balance</span>
              <span className="metric-icon">$</span>
            </div>
            <div className="metric-value">$45,231.89</div>
            <div className="metric-change positive">+20.1% from last month</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Active Bots</span>
              <span className="metric-icon">👥</span>
            </div>
            <div className="metric-value">+12</div>
            <div className="metric-change positive">+2 since last login</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Total Profit</span>
              <span className="metric-icon">💼</span>
            </div>
            <div className="metric-value">+$12,234</div>
            <div className="metric-change positive">+19% from last month</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Active Trades</span>
              <span className="metric-icon">📊</span>
            </div>
            <div className="metric-value">+573</div>
            <div className="metric-change positive">+201 since yesterday</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-grid">
          {/* Profit Chart */}
          <div className="chart-card large">
            <h3 className="chart-title">Profit Chart</h3>
            <div className="time-toggles">
              {['Daily', 'Weekly', 'Monthly'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimePeriod(period.toLowerCase())}
                  className={`toggle-btn ${timePeriod === period.toLowerCase() ? 'active' : ''}`}
                >
                  {period}
                </button>
              ))}
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
          <div className="chart-card">
            <h3 className="chart-title">Recent Trades</h3>
            <p className="trades-info">You made 265 trades this month.</p>
            <div className="trades-list">
              {recentTrades.map((trade, idx) => (
                <div key={idx} className="trade-item">
                  <div className="trade-pair">
                    <span className={`trade-indicator ${trade.positive ? 'positive' : 'negative'}`}>
                      {trade.positive ? '🟢' : '🔴'}
                    </span>
                    <span className="pair-name">{trade.pair}</span>
                  </div>
                  <span className={`trade-profit ${trade.positive ? 'positive' : 'negative'}`}>
                    {trade.positive ? '+' : ''}
                    ${trade.profit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bottom-grid">
          {/* Top Performing Bots */}
          <div className="chart-card">
            <h3 className="chart-title">Top Performing Bots</h3>
            <div className="bots-table">
              <div className="table-header">
                <div className="col-bot">Bot Name</div>
                <div className="col-profit">Profit</div>
                <div className="col-winrate">Win Rate</div>
              </div>
              {topBots.map((bot, idx) => (
                <div key={idx} className="table-row">
                  <div className="col-bot">{bot.name}</div>
                  <div className="col-profit positive">+${bot.profit}</div>
                  <div className="col-winrate">{bot.winRate}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Wallet Overview */}
          <div className="chart-card">
            <h3 className="chart-title">Wallet Overview</h3>
            <div className="wallet-list">
              {walletData.map((asset, idx) => (
                <div key={idx} className="wallet-item">
                  <div className="asset-info">
                    <div className="asset-name">{asset.symbol}</div>
                    <div className="asset-amount">{asset.amount} {asset.symbol.split(' ')[0]}</div>
                  </div>
                  <div className="asset-value">
                    <div className="asset-usd">${asset.usd}</div>
                    <div className={`asset-change ${asset.change.includes('+') ? 'positive' : 'negative'}`}>
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
