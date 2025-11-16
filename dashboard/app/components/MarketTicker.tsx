'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketPrice {
  symbol: string;
  price: number;
  change24h: number;
}

interface MarketTickerProps {
  prices?: MarketPrice[];
}

const MarketTicker: React.FC<MarketTickerProps> = ({ prices = defaultPrices }) => {
  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-gray-900 border-b border-gray-800 overflow-x-auto scrollbar-hide">
      {prices.map((market, index) => (
        <div
          key={index}
          className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-lg whitespace-nowrap hover:bg-gray-700 transition-colors cursor-pointer"
        >
          <span className="font-semibold text-white text-sm">{market.symbol}</span>
          <span className="font-bold text-white text-sm">${market.price.toFixed(2)}</span>
          <div
            className={`flex items-center gap-0.5 ${
              market.change24h >= 0 ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {market.change24h >= 0 ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
            <span className="text-xs font-medium">
              {market.change24h >= 0 ? '+' : ''}{market.change24h.toFixed(2)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const defaultPrices: MarketPrice[] = [
  { symbol: 'BTC/USD', price: 68245.32, change24h: 2.4 },
  { symbol: 'ETH/USD', price: 3892.17, change24h: -0.8 },
  { symbol: 'SOL/USD', price: 210.45, change24h: 5.2 },
  { symbol: 'XRP/USD', price: 2.85, change24h: 1.5 },
  { symbol: 'ADA/USD', price: 1.12, change24h: -2.1 },
];

export default MarketTicker;
