# 🚀 Quick Start Guide - Trading Agent Web Testing

## 30-Second Setup

### Step 1: Clone & Install
```bash
git clone https://github.com/AE707/trading-agent.git
cd trading-agent
pip install -r requirements.txt
pip install streamlit plotly
```

### Step 2: Run Web Dashboard
```bash
streamlit run streamlit_app.py
```

### Step 3: Open Browser
```
http://localhost:8501
```

---

## Dashboard Features (2 Minutes)

### Configure Your Backtest
1. **Left Sidebar:**
   - Set Initial Capital ($1K - $100K)
   - Choose Trading Symbol (BTCUSDT)
   - Adjust SMA periods (20/50 default)
   - Set Confidence Threshold (0-1)

2. **Click "Execute Backtest"**
   - Watch real-time processing

3. **View Results:**
   - Interactive price chart
   - Trade history
   - Performance metrics (P&L, ROI)
   - Export to CSV

---

## What's Happening

```
① Load Market Data (10 days OHLCV)
    ↓
② Generate Trading Signals (SMA Crossover)
    ↓
③ Score with ML Model (Confidence 0-1)
    ↓
④ Execute Paper Trades
    ↓
⑤ Calculate Performance
    ↓
⑥ Display Results
```

---

## Key Controls

| Control | Range | Default |
|---------|-------|----------|
| Initial Capital | $1K-$100K | $10K |
| SMA Short | 5-30 | 20 |
| SMA Long | 30-100 | 50 |
| Confidence | 0.0-1.0 | 0.7 |

---

## Output Metrics

- **Current Price**: Latest market price
- **Price Change**: Percentage change
- **Days**: Number of trading days
- **Volume**: Average trading volume
- **Final Cash**: Portfolio value after backtest
- **Total Trades**: Number of executed trades
- **Position**: Current holdings
- **P&L**: Profit/Loss in dollars
- **ROI**: Return on Investment %

---

## Common Tasks

### ✅ Run Backtest
1. Click "Execute Backtest" button
2. Wait for "Backtest completed successfully" message
3. View interactive chart and metrics

### 💾 Export Results
1. Scroll to "Export Results" section
2. Click "Download CSV" button
3. Results saved to `backtest_results.csv`

### 🔊 Change Parameters
1. Adjust sliders in left sidebar
2. New values apply immediately
3. Click "Execute Backtest" again

### ⚠️ Fix "No Trades" Issue
- Lower confidence threshold
- Increase SMA periods
- Use more market data

---

## Troubleshooting

### ❌ Port 8501 In Use
```bash
streamlit run streamlit_app.py --server.port 8502
```

### ❌ Module Not Found
```bash
pip install -r requirements.txt --upgrade
```

### ❌ Data File Missing
```bash
# Verify files exist:
ls data/market_data.csv
ls config/config.yaml
```

---

## Performance Expectations

- **Dashboard Load**: 2-3 seconds
- **Backtest Execution**: 0.5-1.2 seconds
- **Chart Rendering**: 1-2 seconds
- **CSV Export**: < 1 second

---

## Next Steps

1. ✅ Try different SMA periods
2. ✅ Test with different capital amounts
3. ✅ Analyze the price chart pattern
4. ✅ Export and analyze CSV results
5. 📄 Read [TESTING.md](TESTING.md) for advanced options
6. 🚀 Deploy to web (see TESTING.md)

---

## Need Help?

Check [TESTING.md](TESTING.md) for:
- Advanced testing methods
- Deployment instructions
- Troubleshooting guide
- Performance benchmarks
- Unit testing

---

**Enjoy testing your trading agent!** 🚀📈
