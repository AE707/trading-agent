#!/usr/bin/env python3
"""
Comprehensive Backtesting Metrics Module
Calculates Sharpe ratio, Sortino ratio, drawdown, win rate, and other performance metrics
"""

import numpy as np
import pandas as pd
import logging
from typing import Dict, Tuple, Optional
from datetime import datetime

logger = logging.getLogger(__name__)


class BacktestingMetrics:
    """Calculate comprehensive backtesting performance metrics"""
    
    def __init__(self, initial_capital: float = 10000.0, risk_free_rate: float = 0.02):
        self.initial_capital = initial_capital
        self.risk_free_rate = risk_free_rate
        self.trades = []
        self.equity_curve = []
    
    def calculate_sharpe_ratio(self, returns: np.ndarray, periods_per_year: int = 252) -> float:
        """Calculate Sharpe Ratio"""
        try:
            excess_returns = returns - (self.risk_free_rate / periods_per_year)
            if len(excess_returns) == 0 or np.std(excess_returns) == 0:
                return 0.0
            sharpe = np.sqrt(periods_per_year) * (np.mean(excess_returns) / np.std(excess_returns))
            logger.info(f"✓ Sharpe Ratio: {sharpe:.2f}")
            return sharpe
        except Exception as e:
            logger.error(f"✗ Error calculating Sharpe Ratio: {e}")
            return 0.0
    
    def calculate_sortino_ratio(self, returns: np.ndarray, periods_per_year: int = 252) -> float:
        """Calculate Sortino Ratio (downside risk focus)"""
        try:
            excess_returns = returns - (self.risk_free_rate / periods_per_year)
            downside_returns = np.minimum(excess_returns, 0)
            downside_std = np.std(downside_returns)
            if downside_std == 0:
                return 0.0
            sortino = np.sqrt(periods_per_year) * (np.mean(excess_returns) / downside_std)
            logger.info(f"✓ Sortino Ratio: {sortino:.2f}")
            return sortino
        except Exception as e:
            logger.error(f"✗ Error calculating Sortino Ratio: {e}")
            return 0.0
    
    def calculate_max_drawdown(self, equity_curve: np.ndarray) -> Tuple[float, int, int]:
        """Calculate Maximum Drawdown and dates"""
        try:
            running_max = np.maximum.accumulate(equity_curve)
            drawdown = (equity_curve - running_max) / running_max
            max_dd = np.min(drawdown)
            max_dd_idx = np.argmin(drawdown)
            max_dd_percent = abs(max_dd) * 100
            logger.info(f"✓ Max Drawdown: {max_dd_percent:.2f}%")
            return max_dd_percent, np.argmax(running_max[:max_dd_idx]), max_dd_idx
        except Exception as e:
            logger.error(f"✗ Error calculating drawdown: {e}")
            return 0.0, 0, 0
    
    def calculate_calmar_ratio(self, returns: np.ndarray, equity_curve: np.ndarray) -> float:
        """Calculate Calmar Ratio (Return / MaxDD)"""
        try:
            total_return = (equity_curve[-1] - self.initial_capital) / self.initial_capital
            max_dd_percent, _, _ = self.calculate_max_drawdown(equity_curve)
            if max_dd_percent == 0:
                return 0.0
            calmar = total_return / (max_dd_percent / 100)
            logger.info(f"✓ Calmar Ratio: {calmar:.2f}")
            return calmar
        except Exception as e:
            logger.error(f"✗ Error calculating Calmar Ratio: {e}")
            return 0.0
    
    def calculate_win_rate(self, trades: list) -> float:
        """Calculate win rate percentage"""
        try:
            if len(trades) == 0:
                return 0.0
            wins = sum(1 for t in trades if t['pnl'] > 0)
            win_rate = (wins / len(trades)) * 100
            logger.info(f"✓ Win Rate: {win_rate:.2f}% ({wins}/{len(trades)})")
            return win_rate
        except Exception as e:
            logger.error(f"✗ Error calculating win rate: {e}")
            return 0.0
    
    def calculate_profit_factor(self, trades: list) -> float:
        """Calculate Profit Factor (Gross Profit / Gross Loss)"""
        try:
            if len(trades) == 0:
                return 0.0
            gross_profit = sum(t['pnl'] for t in trades if t['pnl'] > 0)
            gross_loss = abs(sum(t['pnl'] for t in trades if t['pnl'] < 0))
            if gross_loss == 0:
                return float('inf') if gross_profit > 0 else 0.0
            pf = gross_profit / gross_loss
            logger.info(f"✓ Profit Factor: {pf:.2f}")
            return pf
        except Exception as e:
            logger.error(f"✗ Error calculating profit factor: {e}")
            return 0.0
    
    def calculate_recovery_factor(self, total_return: float, max_drawdown: float) -> float:
        """Calculate Recovery Factor"""
        try:
            if max_drawdown == 0:
                return 0.0
            rf = total_return / max_drawdown
            logger.info(f"✓ Recovery Factor: {rf:.2f}")
            return rf
        except Exception as e:
            logger.error(f"✗ Error calculating recovery factor: {e}")
            return 0.0
    
    def calculate_all_metrics(self, trades: list, equity_curve: list) -> Dict:
        """Calculate all metrics at once"""
        try:
            equity_array = np.array(equity_curve)
            returns = np.diff(equity_array) / equity_array[:-1]
            
            total_return = (equity_array[-1] - self.initial_capital) / self.initial_capital * 100
            max_dd, _, _ = self.calculate_max_drawdown(equity_array)
            
            metrics = {
                'total_return': total_return,
                'sharpe_ratio': self.calculate_sharpe_ratio(returns),
                'sortino_ratio': self.calculate_sortino_ratio(returns),
                'max_drawdown': max_dd,
                'calmar_ratio': self.calculate_calmar_ratio(returns, equity_array),
                'win_rate': self.calculate_win_rate(trades),
                'profit_factor': self.calculate_profit_factor(trades),
                'recovery_factor': self.calculate_recovery_factor(total_return, max_dd),
                'total_trades': len(trades),
                'trades': trades,
                'final_equity': equity_array[-1]
            }
            
            logger.info("\n" + "="*60)
            logger.info("BACKTEST METRICS SUMMARY")
            logger.info("="*60)
            for key, value in metrics.items():
                if key not in ['trades']:
                    logger.info(f"  {key}: {value}")
            logger.info("="*60 + "\n")
            
            return metrics
        except Exception as e:
            logger.error(f"✗ Error calculating metrics: {e}")
            return {}
