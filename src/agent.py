class TradingAgent:
    """Main orchestrator for three-stage trading pipeline."""
    
    def __init__(self, config, rules_engine, model, broker, journal):
        self.config = config
        self.rules_engine = rules_engine
        self.model = model
        self.broker = broker
        self.journal = journal
    
    def run_cycle(self, market_data):
        """Execute single trading cycle."""
        # Stage 1: Generate rules-based signal
        signal_df = self.rules_engine.compute_signals(market_data['close'])
        latest_signal = signal_df['signal'].iloc[-1]
        
        # Stage 2: Score signal with ML model
        features = signal_df[['sma_short', 'sma_long']].iloc[-1:]
        score = self.model.score(features)
        
        # Stage 3: Execute trade if confidence is high
        if score[0] > 0.7 and latest_signal == 1:
            price = market_data['close'].iloc[-1]
            self.broker.place_order(quantity=1, price=price)
            self.journal.log_trade('BUY', 1, price)
        
        return {'signal': latest_signal, 'score': score[0]}
