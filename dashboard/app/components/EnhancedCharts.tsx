'use client';

import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';

const phaseData = [
  { name: 'P1', accuracy: 68, loss: 32 },
  { name: 'P2', accuracy: 71, loss: 29 },
  { name: 'P3', accuracy: 72, loss: 28 },
  { name: 'P4', accuracy: 73, loss: 27 },
  { name: 'P5', accuracy: 73.2, loss: 26.8 },
  { name: 'P6', accuracy: 73.42, loss: 26.58 },
];

export const AreaChartComponent = () => (
  <div className="bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-700 overflow-hidden">
    <h2 className="text-sm sm:text-lg font-semibold mb-3 sm:mb-4">Accuracy Over Time</h2>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={phaseData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
        <defs>
          <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0086cc" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#0086cc" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="name" stroke="#999" tick={{ fontSize: 12 }} />
        <YAxis stroke="#999" tick={{ fontSize: 12 }} />
        <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #444' }} />
        <Area type="monotone" dataKey="accuracy" stroke="#0086cc" fillOpacity={1} fill="url(#colorAccuracy)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export const StackedChartComponent = () => (
  <div className="bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-700 overflow-hidden">
    <h2 className="text-sm sm:text-lg font-semibold mb-3 sm:mb-4">Accuracy vs Loss</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={phaseData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="name" stroke="#999" tick={{ fontSize: 12 }} />
        <YAxis stroke="#999" tick={{ fontSize: 12 }} />
        <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #444' }} />
        <Legend />
        <Bar dataKey="accuracy" stackId="a" fill="#00cc99" radius={[6, 6, 0, 0]} />
        <Bar dataKey="loss" stackId="a" fill="#ff6b6b" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const ComposedChartComponent = () => (
  <div className="bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-700 overflow-hidden">
    <h2 className="text-sm sm:text-lg font-semibold mb-3 sm:mb-4">Performance Metrics</h2>
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={phaseData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="name" stroke="#999" tick={{ fontSize: 12 }} />
        <YAxis stroke="#999" tick={{ fontSize: 12 }} />
        <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #444' }} />
        <Legend />
        <Area type="monotone" dataKey="accuracy" fill="#0086cc" stroke="#00cc99" opacity={0.4} />
        <Bar dataKey="loss" fill="#ffaa00" radius={[4, 4, 0, 0]} />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);
