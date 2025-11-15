#!/usr/bin/env python3
"""
Complete ML Data Collection & Auto-Learning Pipeline Execution
Demonstrates end-to-end workflow from data collection to model training
"""

import pandas as pd
import numpy as np
import logging
from datetime import datetime

# Import our custom modules
from src.data_collector import DataCollector
from src.auto_learner import AutoLearner

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def execute_pipeline():
    """
    Execute the complete ML pipeline: Data -> Features -> Training -> Prediction
    """
    
    print("\n" + "="*80)
    print("AUTOMATED TRADING AGENT: ML DATA COLLECTION & AUTO-LEARNING PIPELINE")
    print("="*80 + "\n")
    
    # ========== PHASE 1: DATA COLLECTION ==========
    print("\n[PHASE 1] DATA COLLECTION")
    print("-" * 80)
    
    collector = DataCollector(data_dir="data")
    logger.info("Collecting market data from CoinGecko API...")
    
    df = collector.collect_market_data('BTCUSDT', days=90)
    logger.info(f"✓ Collected {len(df)} records of market data")
    print(f"  • Data range: {df['date'].min()} to {df['date'].max()}")
    print(f"  • Price range: ${df['close'].min():.2f} - ${df['close'].max():.2f}")
    print(f"  • Avg volume: {df['volume'].mean():,.0f}")
    
    # ========== PHASE 2: DATA VALIDATION ==========
    print("\n[PHASE 2] DATA VALIDATION")
    print("-" * 80)
    
    is_valid, issues = collector.validate_data(df)
    quality_report = collector.get_quality_report()
    
    print(f"  • Quality Score: {quality_report['score']}/100")
    print(f"  • Records: {quality_report['records']}")
    
    if is_valid:
        print("  ✓ All validation checks passed!")
    else:
        print(f"  ⚠ Issues found: {issues}")
    
    # Save data
    collector.save_data(df, 'BTCUSDT')
    logger.info("✓ Data saved with versioning")
    
    # ========== PHASE 3: FEATURE ENGINEERING ==========
    print("\n[PHASE 3] FEATURE ENGINEERING")
    print("-" * 80)
    
    learner = AutoLearner(models_dir="models")
    logger.info("Generating technical indicators...")
    
    df_features = learner.prepare_features(df)
    logger.info(f"✓ Generated features for {len(df_features)} samples")
    
    # Display feature summary
    features_list = ['SMA_10', 'SMA_20', 'SMA_50', 'RSI', 'MACD', 'ATR', 'Volatility', 'Volume_Ratio']
    print(f"  • Features generated: {', '.join(features_list)}")
    print(f"  • Total features: {len(df_features.columns)}")
    
    # ========== PHASE 4: LABEL GENERATION ==========
    print("\n[PHASE 4] LABEL GENERATION")
    print("-" * 80)
    
    df_labeled = learner.generate_labels(df_features, lookahead=5, threshold=0.01)
    logger.info("✓ Generated trading labels")
    
    num_buys = (df_labeled['Label'] == 1).sum()
    num_holds = (df_labeled['Label'] == 0).sum()
    
    print(f"  • Buy signals: {num_buys}")
    print(f"  • Hold signals: {num_holds}")
    print(f"  • Total labeled samples: {len(df_labeled)}")
    
    # ========== PHASE 5: MODEL TRAINING ==========
    print("\n[PHASE 5] MODEL TRAINING")
    print("-" * 80)
    
    # Prepare training data
    feature_cols = ['SMA_10', 'SMA_20', 'SMA_50', 'RSI', 'MACD', 'Signal', 
                    'Volatility', 'ATR', 'Volume_Ratio', 'Returns', 'High_Low', 'Close_Position']
    
    X = df_labeled[feature_cols].dropna()
    y = df_labeled.loc[X.index, 'Label']
    
    logger.info(f"Training ensemble model with {len(X)} samples...")
    learner.train_model(X, y, model_name='trading_ensemble')
    logger.info("✓ Model training completed")
    
    # Get model metrics
    metrics = learner.performance_metrics['trading_ensemble']
    print(f"  • Cross-validation score: {metrics['cv_mean']:.4f} ± {metrics['cv_std']:.4f}")
    print(f"  • Model type: Ensemble (Random Forest + Gradient Boosting)")
    print(f"  • Estimators: 200 total (RF: 150, GB: 50)")
    
    # ========== PHASE 6: FEATURE IMPORTANCE ==========
    print("\n[PHASE 6] FEATURE IMPORTANCE ANALYSIS")
    print("-" * 80)
    
    importance = learner.get_feature_importance('trading_ensemble')
    
    if importance:
        # Get top 5 features
        top_features = sorted(importance.items(), key=lambda x: x[1], reverse=True)[:5]
        print("  Top 5 Most Important Features:")
        for idx, (feature_idx, score) in enumerate(top_features, 1):
            feature_name = feature_cols[feature_idx] if feature_idx < len(feature_cols) else f"Feature_{feature_idx}"
            print(f"    {idx}. {feature_name}: {score:.4f}")
    
    # ========== PHASE 7: PREDICTION DEMO ==========
    print("\n[PHASE 7] PREDICTION DEMONSTRATION")
    print("-" * 80)
    
    # Get latest features for prediction
    X_latest = X.tail(5)
    
    predictions = learner.predict(X_latest, confidence_threshold=0.6)
    confidence_scores = learner.get_confidence_scores(X_latest)
    
    print("  Last 5 days prediction:")
    for i, (pred, conf) in enumerate(zip(predictions, confidence_scores), 1):
        signal = "BUY" if pred == 1 else "HOLD"
        print(f"    Day {i}: {signal:4s} (confidence: {conf:.2%})")
    
    # ========== FINAL SUMMARY ==========
    print("\n" + "="*80)
    print("PIPELINE EXECUTION SUMMARY")
    print("="*80)
    
    summary = {
        'Data Collected': f"{len(df)} records (90 days)",
        'Data Quality Score': f"{quality_report['score']}/100",
        'Features Generated': len(df_features.columns),
        'Training Samples': len(X),
        'Buy Signals': num_buys,
        'Model Type': 'Ensemble Learning',
        'CV Score': f"{metrics['cv_mean']:.4f} ± {metrics['cv_std']:.4f}",
        'Status': '✓ SUCCESS'
    }
    
    for key, value in summary.items():
        print(f"  {key:.<40} {value}")
    
    print("\n" + "="*80)
    print(f"Execution completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("="*80 + "\n")
    
    return learner, df, X, y


if __name__ == "__main__":
    try:
        learner, df, X, y = execute_pipeline()
        print("✓ ML Pipeline executed successfully!")
        print("\nNext steps:")
        print("  1. Integrate predictions into backtester")
        print("  2. Deploy model to trading agent")
        print("  3. Monitor real-time predictions on dashboard")
    except Exception as e:
        logger.error(f"Pipeline execution failed: {e}", exc_info=True)
        print(f"\n✗ Error: {e}")
