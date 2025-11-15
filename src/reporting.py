import pandas as pd

class PerformanceReporter:
    """Analytics and reporting for trading results."""
    
    def __init__(self, trades_df):
        self.trades_df = trades_df
    
    def calculate_returns(self):
        """Calculate total and cumulative returns."""
        self.trades_df['pnl'] = self.trades_df['close'].diff()
        total_pnl = self.trades_df['pnl'].sum()
        return total_pnl
    
    def calculate_win_rate(self):
        """Calculate percentage of winning trades."""
        if len(self.trades_df) == 0:
            return 0.0
        winning = (self.trades_df['pnl'] > 0).sum()
        return winning / len(self.trades_df)
    
    def generate_report(self):
        """Generate performance summary report."""
        return {
            'total_trades': len(self.trades_df),
            'total_pnl': self.calculate_returns(),
            'win_rate': self.calculate_win_rate()
        }
