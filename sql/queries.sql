-- Analytics Queries for Trading Agent

-- Total profit and loss
SELECT SUM(pnl) as total_pnl FROM trades;

-- Win rate calculation
SELECT 
    COUNT(CASE WHEN pnl > 0 THEN 1 END) * 100.0 / COUNT(*) as win_rate
FROM trades;

-- Trade history with stats
SELECT 
    timestamp, 
    action, 
    quantity, 
    price, 
    pnl
FROM trades
ORDER BY timestamp DESC;

-- Signal confidence distribution
SELECT signal_type, AVG(confidence) FROM signals GROUP BY signal_type;
