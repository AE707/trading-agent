# Machine Learning & Data Integration Guide

## Overview
This document explains how to use the enhanced data collection and auto-learning modules to build a powerful, self-improving trading agent.

## New Modules

### 1. DataCollector (`data_collector.py`)
Handles collection, validation, and storage of market data from multiple sources.

**Features:**
- Multi-source data collection with automatic fallback
- CoinGecko API integration (free tier, no authentication needed)
- Synthetic data generation for backtesting
- Comprehensive data validation
- Data versioning with timestamps
- Quality metrics tracking

**Usage:**
```python
from src.data_collector import DataCollector

# Initialize collector
collector = DataCollector(data_dir="data")

# Collect market data
df = collector.collect_market_data('BTCUSDT', days=90)

# Validate data
is_valid, issues = collector.validate_data(df)
if not is_valid:
    print(f"Data issues found: {issues}")

# Save data with versioning
collector.save_data(df, 'BTCUSDT')

# Get quality report
quality_report = collector.get_quality_report()
print(f"Data Quality Score: {quality_report['score']}/100")
```

### 2. AutoLearner (`auto_learner.py`)
Incremental machine learning system for trading signal generation.

**Features:**
- Advanced technical indicator generation (SMA, RSI, MACD, ATR, etc.)
- Ensemble learning (Random Forest + Gradient Boosting)
- Time-series cross-validation
- Incremental model updates
- Feature importance analysis
- Model versioning and persistence

**Usage:**
```python
from src.auto_learner import AutoLearner

# Initialize learner
learner = AutoLearner(models_dir="models")

# Prepare features from market data
df_features = learner.prepare_features(df)

# Generate labels for supervised learning
df_labeled = learner.generate_labels(df_features, lookahead=5, threshold=0.01)

# Extract features and labels
X = df_labeled[['SMA_10', 'SMA_20', 'RSI', 'MACD', 'Volatility', 'ATR', 'Volume_Ratio', 'Returns']]
y = df_labeled['Label']

# Train model
learner.train_model(X, y, model_name='ensemble')

# Make predictions
predictions = learner.predict(X_new, confidence_threshold=0.6)

# Get confidence scores
confidence = learner.get_confidence_scores(X_new)

# Analyze feature importance
importance = learner.get_feature_importance()
print(f"Top features: {sorted(importance.items(), key=lambda x: x[1], reverse=True)[:5]}")
```

## Workflow: Complete Pipeline

### 1. Data Collection Phase
```python
from src.data_collector import DataCollector

collector = DataCollector()
df = collector.collect_market_data('BTCUSDT', days=365)
is_valid, issues = collector.validate_data(df)

if is_valid:
    collector.save_data(df, 'BTCUSDT')
    print(f"Collected {len(df)} records")
else:
    print(f"Quality issues: {issues}")
```

### 2. Feature Engineering Phase
```python
from src.auto_learner import AutoLearner

learner = AutoLearner()
df_features = learner.prepare_features(df)
df_labeled = learner.generate_labels(df_features)
print(f"Generated {len(df_labeled)} labeled samples")
```

### 3. Model Training Phase
```python
X = df_labeled[['SMA_10', 'SMA_20', 'SMA_50', 'RSI', 'MACD', 'Signal', 
                'Volatility', 'ATR', 'Volume_Ratio', 'Returns', 'High_Low', 'Close_Position']]
y = df_labeled['Label']

learner.train_model(X, y, model_name='trading_ensemble')
print(f"Model metrics: {learner.performance_metrics['trading_ensemble']}")
```

### 4. Signal Generation Phase (In Backtester)
```python
# During backtesting
X_current = prepare_current_features(market_data)
confidence = learner.get_confidence_scores(X_current)

if confidence[0] > 0.6:
    signal = 1  # BUY
elif confidence[0] < 0.4:
    signal = -1  # SELL
else:
    signal = 0  # HOLD
```

## Data Collection Sources

### Primary: CoinGecko API (Free)
- No authentication required
- 10-365 days of historical data
- Supported symbols: bitcoin, ethereum, binancecoin, etc.
- Rate limit: 50 calls/minute (generous for retail use)

### Fallback: Synthetic Data Generator
- Realistic price movements with trend and volatility
- Geometric Brownian Motion pricing model
- Automatic volume generation
- Perfect for backtesting and model validation

## Data Validation Checks

The DataCollector validates:
1. **Completeness**: No missing OHLCV values
2. **Data Types**: All numeric columns are proper numbers
3. **Price Logic**: High >= Close >= Low >= Open
4. **Outliers**: Flags trades with >10% daily change
5. **Date Continuity**: Sequential daily data

## Auto-Learning Features

### Technical Indicators Generated
- **Trend**: SMA (10, 20, 50 periods)
- **Momentum**: RSI, MACD, Signal Line
- **Volatility**: ATR, Volatility (rolling std)
- **Volume**: Volume ratio, Volume SMA
- **Price Action**: Returns, High-Low range, Close position in range

### Model Architecture
- **Random Forest**: 150 estimators, max depth 12
- **Gradient Boosting**: 50 estimators, 0.1 learning rate
- **Ensemble**: Average probabilities from both models
- **Cross-Validation**: 5-fold time-series split

## Performance Monitoring

Track model performance:
```python
# Get cross-validation metrics
metrics = learner.performance_metrics['trading_ensemble']
print(f"CV Mean: {metrics['cv_mean']:.4f}")
print(f"CV Std Dev: {metrics['cv_std']:.4f}")

# Feature importance analysis
importance = learner.get_feature_importance()
for feature_idx, importance_score in sorted(importance.items(), 
                                           key=lambda x: x[1], 
                                           reverse=True)[:10]:
    print(f"Feature {feature_idx}: {importance_score:.4f}")
```

## Incremental Updates

As new data arrives:
```python
# Collect new data
new_data = collector.collect_market_data('BTCUSDT', days=30)

# Combine with historical data
combined_df = pd.concat([historical_df, new_data])

# Retrain model
df_features = learner.prepare_features(combined_df)
df_labeled = learner.generate_labels(df_features)
learner.train_model(X, y, model_name='trading_ensemble_v2')
```

## Hyperparameter Tuning

Adjustable parameters in `auto_learner.py`:
- `n_estimators`: Number of trees (default 150 for RF)
- `max_depth`: Tree depth limit (default 12)
- `learning_rate`: Boosting rate (default 0.1 for GB)
- `lookahead`: Days to predict ahead (default 5)
- `threshold`: Return threshold for labels (default 0.01 = 1%)

## Storage & Versioning

### Data Files
```
data/
├── BTCUSDT_20250115_143022.csv
├── BTCUSDT_20250115_143022_meta.json
├── ETHUSDT_20250115_143022.csv
└── ETHUSDT_20250115_143022_meta.json
```

### Model Files
```
models/
├── trading_ensemble_20250115_143022.pkl
├── trading_ensemble_scaler_20250115_143022.pkl
└── trading_ensemble_20250115_145000.pkl
```

## Next Steps

1. **Integration with Backtester**: Modify `backtester.py` to use `AutoLearner` predictions
2. **Real-time Predictions**: Deploy models to `agent.py` for live trading
3. **Continuous Learning**: Implement scheduled retraining pipeline
4. **Multi-symbol Support**: Extend to multiple trading pairs simultaneously
5. **Advanced Indicators**: Add more technical indicators (Bollinger Bands, Stochastic, etc.)

## Requirements

Add to `requirements.txt`:
```
scikit-learn>=1.0.0
requests>=2.28.0
joblib>=1.2.0
```
