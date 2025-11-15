import pandas as pd
import numpy as np

class SMARulesEngine:
    """Simple Moving Average based trading rules."""
    
    def __init__(self, short_period=20, long_period=50):
        self.short_period = short_period
        self.long_period = long_period
    
    def compute_signals(self, prices):
        """Generate trading signals based on SMA crossover."""
        df = pd.DataFrame({'close': prices})
        df['sma_short'] = df['close'].rolling(self.short_period).mean()
        df['sma_long'] = df['close'].rolling(self.long_period).mean()
        
        df['signal'] = 0
        df.loc[df['sma_short'] > df['sma_long'], 'signal'] = 1  # Buy
        df.loc[df['sma_short'] < df['sma_long'], 'signal'] = -1  # Sell
        
        return df
