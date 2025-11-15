# Trading Agent — Automated Three-Stage Trader Learning Pipeline

Production-ready Python framework for autonomous trading agents implementing theory → backtest → paper test → live trading pipeline with continuous learning.

## Features

- **Event-driven backtester** — Realistic OHLCV simulation with slippage, commissions
- **Rule engine** — Deterministic SMA-based entry/exit logic
- **ML scoring model** — Logistic regression probability scoring
- **Paper broker** — Order simulation and position tracking
- **PostgreSQL journal** — Complete event logging for analysis
- **Analytics dashboard** — Sharpe ratio, drawdown, win rate, calibration metrics

## Quick Start

```bash
git clone https://github.com/AE707/trading-agent.git
cd trading-agent
pip install -r requirements.txt

# Run backtest
python src/backtester.py

# Run agent
python src/agent.py

# View analytics
python src/reporting.py
```

## Configuration

Edit `config/config.yaml`:

```yaml
trading:
  symbol: BTCUSDT
  risk_per_trade: 0.01
  max_drawdown: 0.15

db:
  uri: postgresql+psycopg2://postgres:postgres@localhost:5432/trading
```

## Architecture

```
Data → Rules → Scoring Model → Broker → Journal → Analytics
```

## Components

- `rules.py` — Entry/exit logic
- `models.py` — ML probability scoring
- `broker.py` — Order simulation
- `journal.py` — Event logging
- `backtester.py` — Historical simulation
- `agent.py` — Main orchestration
- `reporting.py` — Metrics & analysis

## License

MIT
