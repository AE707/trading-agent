'use client';

import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface SparklineCardProps {
  title: string;
  value: string | number;
  change: number;
  data: { value: number }[];
  color?: string;
  prefix?: string;
}

export default function SparklineCard({
  title,
  value,
  change,
  data,
  color = '#3b82f6',
  prefix = '',
}: SparklineCardProps) {
  const isPositive = change >= 0;
  const changeColor = isPositive ? 'text-green-500' : 'text-red-500';
  const bgColor = isPositive ? 'bg-green-500/10' : 'bg-red-500/10';

  return (
    <div className="p-4 rounded-lg border border-dark-500/30 bg-dark-700 hover:bg-dark-600 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className="text-white text-lg font-semibold">
            {prefix}
            {value}
          </p>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded ${bgColor}`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-xs font-medium ${changeColor}`}>
            {isPositive ? '+' : ''}
            {change.toFixed(2)}%
          </span>
        </div>
      </div>
      <div className="h-12 -mx-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
