'use client';

import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

type TimePeriod = '1H' | '4H' | '1D' | '1W' | '1M';

interface TimePeriodToggleProps {
  onPeriodChange?: (period: TimePeriod) => void;
  defaultPeriod?: TimePeriod;
}

const periods: { label: string; value: TimePeriod }[] = [
  { label: '1H', value: '1H' },
  { label: '4H', value: '4H' },
  { label: '1D', value: '1D' },
  { label: '1W', value: '1W' },
  { label: '1M', value: '1M' },
];

export default function TimePeriodToggle({
  onPeriodChange,
  defaultPeriod = '1D',
}: TimePeriodToggleProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>(defaultPeriod);

  const handlePeriodChange = (period: TimePeriod) => {
    setSelectedPeriod(period);
    onPeriodChange?.(period);
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-dark-700 border border-dark-500/30 rounded-lg">
      <Calendar className="w-4 h-4 text-gray-400" />
      <div className="flex gap-1">
        {periods.map((period) => (
          <button
            key={period.value}
            onClick={() => handlePeriodChange(period.value)}
            className={`px-3 py-1.5 rounded font-medium text-xs transition-colors ${
              selectedPeriod === period.value
                ? 'bg-blue-500 text-white'
                : 'bg-dark-600 text-gray-400 hover:text-white hover:bg-dark-500'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>
    </div>
  );
}
