import pandas as pd

class EventDrivenBacktester:
    """Event-driven backtesting engine."""
    
    def __init__(self, data, broker, rules_engine, model):
        self.data = data
        self.broker = broker
        self.rules_engine = rules_engine
        self.model = model
        self.results = []
    
    def run(self):
        """Execute backtest on historical data."""
        for idx, row in self.data.iterrows():
            # Generate trading signal
            signal = self.rules_engine.compute_signals([row['close']])
            
            # Score the trade
            if signal is not None:
                score = self.model.score([signal])
                
                if score > 0.5:  # Confidence threshold
                    self.broker.place_order(1, row['close'])
                    self.results.append({
                        'date': row.name,
                        'action': 'BUY',
                        'price': row['close']
                    })
    
    def get_results(self):
        """Return backtest results."""
        return pd.DataFrame(self.results)
