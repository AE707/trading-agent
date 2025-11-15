class PaperBroker:
    """Simulated paper trading broker."""
    
    def __init__(self, initial_cash=10000.0):
        self.cash = initial_cash
        self.position = 0.0
        self.trades = []
    
    def place_order(self, quantity, price):
        """Execute market order."""
        cost = quantity * price
        if cost <= self.cash:
            self.cash -= cost
            self.position += quantity
            self.trades.append({
                'quantity': quantity,
                'price': price,
                'action': 'BUY'
            })
            return True
        return False
    
    def close_position(self, price):
        """Close position at given price."""
        if self.position > 0:
            proceeds = self.position * price
            self.cash += proceeds
            self.trades.append({
                'quantity': self.position,
                'price': price,
                'action': 'SELL'
            })
            self.position = 0.0
            return True
        return False
