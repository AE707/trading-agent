import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.model_selection import TimeSeriesSplit
from datetime import datetime
import joblib
import logging
from pathlib import Path
from typing import Dict, List, Tuple, Optional

logger = logging.getLogger(__name__)

class AutoLearner:
    """Incremental machine learning system for trading signal generation"""
    
    def __init__(self, models_dir: str = "models"):
        self.models_dir = Path(models_dir)
        self.models_dir.mkdir(exist_ok=True)
        self.models = {}
        self.scalers = {}
        self.training_history = []
        self.performance_metrics = {}
        
    def prepare_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Generate trading features from OHLCV data"""
        df = df.copy()
        
        # Technical indicators
        df['SMA_10'] = df['close'].rolling(10).mean()
        df['SMA_20'] = df['close'].rolling(20).mean()
        df['SMA_50'] = df['close'].rolling(50).mean()
        
        # Momentum indicators
        df['RSI'] = self._calculate_rsi(df['close'], 14)
        df['MACD'], df['Signal'] = self._calculate_macd(df['close'])
        
        # Volatility
        df['Volatility'] = df['close'].pct_change().rolling(20).std()
        df['ATR'] = self._calculate_atr(df, 14)
        
        # Volume analysis
        df['Volume_SMA'] = df['volume'].rolling(20).mean()
        df['Volume_Ratio'] = df['volume'] / df['Volume_SMA']
        
        # Price action
        df['Returns'] = df['close'].pct_change()
        df['High_Low'] = (df['high'] - df['low']) / df['close']
        df['Close_Position'] = (df['close'] - df['low']) / (df['high'] - df['low'])
        
        return df.dropna()
    
    def _calculate_rsi(self, prices, period=14):
        """Calculate Relative Strength Index"""
        delta = prices.diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
        rs = gain / loss
        return 100 - (100 / (1 + rs))
    
    def _calculate_macd(self, prices, fast=12, slow=26, signal=9):
        """Calculate MACD"""
        ema_fast = prices.ewm(span=fast).mean()
        ema_slow = prices.ewm(span=slow).mean()
        macd = ema_fast - ema_slow
        signal_line = macd.ewm(span=signal).mean()
        return macd, signal_line
    
    def _calculate_atr(self, df, period=14):
        """Calculate Average True Range"""
        tr1 = df['high'] - df['low']
        tr2 = abs(df['high'] - df['close'].shift())
        tr3 = abs(df['low'] - df['close'].shift())
        tr = pd.concat([tr1, tr2, tr3], axis=1).max(axis=1)
        return tr.rolling(period).mean()
    
    def generate_labels(self, df: pd.DataFrame, lookahead=5, threshold=0.01) -> pd.DataFrame:
        """Generate training labels (Buy/Sell signals)"""
        df = df.copy()
        future_returns = df['close'].shift(-lookahead).pct_change() / threshold
        df['Label'] = (future_returns > 1).astype(int)
        return df
    
    def train_model(self, X: pd.DataFrame, y: pd.Series, model_name: str = 'ensemble'):
        """Train ensemble model with cross-validation"""
        logger.info(f"Training {model_name} model with {len(X)} samples")
        
        # Scaler
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)
        
        # Time series cross-validation
        tscv = TimeSeriesSplit(n_splits=5)
        scores = []
        
        for train_idx, test_idx in tscv.split(X_scaled):
            X_train, X_test = X_scaled[train_idx], X_scaled[test_idx]
            y_train, y_test = y.iloc[train_idx], y.iloc[test_idx]
            
            # Ensemble model
            rf = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
            gb = GradientBoostingClassifier(n_estimators=50, learning_rate=0.1, random_state=42)
            
            rf.fit(X_train, y_train)
            gb.fit(X_train, y_train)
            
            # Ensemble prediction
            rf_pred = rf.predict_proba(X_test)[:, 1]
            gb_pred = gb.predict_proba(X_test)[:, 1]
            ensemble_pred = (rf_pred + gb_pred) / 2
            
            score = np.mean(ensemble_pred[y_test == 1] > 0.5)
            scores.append(score)
            logger.info(f"CV Fold Score: {score:.4f}")
        
        # Train final model on all data
        final_model = RandomForestClassifier(n_estimators=150, max_depth=12, random_state=42)
        final_model.fit(X_scaled, y)
        
        self.models[model_name] = final_model
        self.scalers[model_name] = scaler
        self.performance_metrics[model_name] = {'cv_mean': np.mean(scores), 'cv_std': np.std(scores)}
        
        self._save_model(model_name)
        logger.info(f"Model {model_name} trained. CV Score: {np.mean(scores):.4f} +/- {np.std(scores):.4f}")
    
    def predict(self, X: pd.DataFrame, model_name: str = 'ensemble', confidence_threshold: float = 0.5) -> np.ndarray:
        """Generate predictions with confidence scores"""
        if model_name not in self.models:
            logger.warning(f"Model {model_name} not found")
            return np.zeros(len(X))
        
        scaler = self.scalers[model_name]
        model = self.models[model_name]
        
        X_scaled = scaler.transform(X)
        predictions = model.predict_proba(X_scaled)[:, 1]
        
        return (predictions > confidence_threshold).astype(int)
    
    def get_confidence_scores(self, X: pd.DataFrame, model_name: str = 'ensemble') -> np.ndarray:
        """Get confidence scores for predictions"""
        if model_name not in self.models:
            return np.zeros(len(X))
        
        scaler = self.scalers[model_name]
        model = self.models[model_name]
        X_scaled = scaler.transform(X)
        
        return model.predict_proba(X_scaled)[:, 1]
    
    def _save_model(self, model_name: str):
        """Save trained model"""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        model_path = self.models_dir / f"{model_name}_{timestamp}.pkl"
        scaler_path = self.models_dir / f"{model_name}_scaler_{timestamp}.pkl"
        
        joblib.dump(self.models[model_name], model_path)
        joblib.dump(self.scalers[model_name], scaler_path)
        logger.info(f"Model saved to {model_path}")
    
    def load_model(self, model_name: str, model_path: str):
        """Load pre-trained model"""
        self.models[model_name] = joblib.load(model_path)
        scaler_path = model_path.replace('.pkl', '_scaler.pkl')
        if Path(scaler_path).exists():
            self.scalers[model_name] = joblib.load(scaler_path)
        logger.info(f"Model {model_name} loaded from {model_path}")
    
    def get_feature_importance(self, model_name: str = 'ensemble') -> Dict[str, float]:
        """Get feature importance from trained model"""
        if model_name not in self.models:
            return {}
        
        model = self.models[model_name]
        importance = dict(zip(range(len(model.feature_importances_)), model.feature_importances_))
        return importance
