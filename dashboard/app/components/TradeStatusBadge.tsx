'use client';

import React from 'react';
import { CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';

type TradeStatus = 'completed' | 'open' | 'pending' | 'failed';

interface TradeStatusBadgeProps {
  status: TradeStatus;
  label?: string;
  showIcon?: boolean;
}

const statusConfig: Record<TradeStatus, { bg: string; text: string; border: string; icon: React.ReactNode }> = {
  completed: {
    bg: 'bg-green-500/10',
    text: 'text-green-500',
    border: 'border-green-500/30',
    icon: <CheckCircle className="w-4 h-4" />,
  },
  open: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-500',
    border: 'border-blue-500/30',
    icon: <Clock className="w-4 h-4" />,
  },
  pending: {
    bg: 'bg-yellow-500/10',
    text: 'text-yellow-500',
    border: 'border-yellow-500/30',
    icon: <AlertCircle className="w-4 h-4" />,
  },
  failed: {
    bg: 'bg-red-500/10',
    text: 'text-red-500',
    border: 'border-red-500/30',
    icon: <XCircle className="w-4 h-4" />,
  },
};

export default function TradeStatusBadge({
  status,
  label,
  showIcon = true,
}: TradeStatusBadgeProps) {
  const config = statusConfig[status];
  const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.bg} ${config.text} ${config.border}`}
    >
      {showIcon && config.icon}
      <span className="text-xs font-medium">{displayLabel}</span>
    </div>
  );
}
