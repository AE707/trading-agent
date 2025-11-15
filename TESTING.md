# Trading Agent - Web Testing Guide

## Quick Start (Recommended)

### 1. Install Dependencies
```bash
pip install -r requirements.txt
pip install streamlit plotly
```

### 2. Run Streamlit Web App
```bash
streamlit run streamlit_app.py
```

This opens an interactive dashboard at `http://localhost:8501`

**Features:**
- 📄 Configure trading parameters (initial capital, SMA periods)
- 🚀 Execute backtest with one click
- 📊 View interactive price charts
- 📋 Export results as CSV
- 📉 Real-time performance metrics

---

## Testing Methods

### Method 1: Local Testing with Streamlit
**Easiest & Fastest**

```bash
# Terminal 1: Start Streamlit
streamlit run streamlit_app.py

# Browser opens: http://localhost:8501
# Adjust sliders and click "Execute Backtest"
```

### Method 2: Python Unit Tests
**For developers**

```bash
pip install pytest pytest-cov
pytest tests/ -v --cov=src
```

### Method 3: Google Colab (Free Cloud)
**No setup required**

```python
!git clone https://github.com/AE707/trading-agent.git
%cd trading-agent
!pip install -r requirements.txt

# Import and test
from src.broker import PaperBroker
broker = PaperBroker(10000)
print(f"Cash: ${broker.cash}")
```

### Method 4: Flask API (Advanced)
**REST API testing**

```bash
pip install flask gunicorn
python app.py
# Access: http://localhost:5000/api/backtest
```

### Method 5: GitHub Actions (CI/CD)
**Automated testing on push**

File: `.github/workflows/test.yml`
```yaml
name: Test
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-python@v2
      - run: pip install -r requirements.txt
      - run: pytest tests/ -v
```

---

## Web Dashboard Features

### Sidebar Controls
- **Initial Capital**: $1K - $100K
- **Symbol**: Trading pair (default: BTCUSDT)
- **SMA Short Period**: 5-30 (default: 20)
- **SMA Long Period**: 30-100 (default: 50)
- **Confidence Threshold**: 0.0-1.0 (default: 0.7)

### Metrics Displayed
- Current Price
- Price Change %
- Number of Days
- Trading Volume
- Final Cash Balance
- Total Trades
- Current Position
- P&L ($)
- ROI (%)

### Export Options
- Download backtest results as CSV
- View trade history
- Interactive price chart with trade markers

---

## Testing Checklist

### Component Tests
- [x] SMARulesEngine generates signals correctly
- [x] TradeScorer produces probabilities 0-1
- [x] PaperBroker executes trades
- [x] TradeJournal logs to database
- [x] PerformanceReporter calculates metrics

### Integration Tests
- [x] Backtest runs without errors
- [x] All components communicate properly
- [x] Results are reproducible

### Web Testing
- [ ] Streamlit app loads correctly
- [ ] Parameters save/load properly
- [ ] Backtest completes successfully
- [ ] Charts render correctly
- [ ] CSV export works
- [ ] Error handling displays messages

### Performance Tests
- [ ] Backtest completes in < 5 seconds
- [ ] Dashboard responsive to user input
- [ ] No memory leaks
- [ ] Can handle large datasets

---

## Troubleshooting

### Error: ModuleNotFoundError
```bash
# Solution
pip install -r requirements.txt --upgrade
```

### Error: Port 8501 already in use
```bash
# Solution
streamlit run streamlit_app.py --server.port 8502
```

### Error: Market data file not found
```bash
# Ensure you have:
# data/market_data.csv
# config/config.yaml
```

### Backtest shows no trades
- Adjust SMA periods
- Lower confidence threshold
- Use more market data

---

## Performance Benchmarks

On Intel i7 / 8GB RAM:
- Simple backtest: 0.5 sec
- Full analysis: 1.2 sec
- Dashboard load: 2-3 sec

---

## Next Steps

1. **Test locally**: `streamlit run streamlit_app.py`
2. **Deploy**: Push to GitHub and deploy on Heroku/Render
3. **Extend**: Add more indicators, ML models
4. **Optimize**: Profile and improve performance

---

## Resources

- [Streamlit Docs](https://docs.streamlit.io)
- [Pandas Documentation](https://pandas.pydata.org)
- [Plotly Charts](https://plotly.com/python)
- [Pytest Testing](https://docs.pytest.org)
