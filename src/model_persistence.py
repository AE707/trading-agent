#!/usr/bin/env python3
"""
Model Persistence Module
Saves and loads trained ML models with metadata and versioning
"""

import pickle
import joblib
import json
import os
import logging
from datetime import datetime
from typing import Any, Dict, Optional
from pathlib import Path

logger = logging.getLogger(__name__)


class ModelPersistence:
    """Handles model saving, loading, and version management"""
    
    def __init__(self, model_dir: str = "models"):
        self.model_dir = Path(model_dir)
        self.model_dir.mkdir(exist_ok=True)
        self.version_file = self.model_dir / "versions.json"
        self.metadata_file = self.model_dir / "metadata.json"
        self._init_version_file()
    
    def _init_version_file(self):
        """Initialize version tracking file"""
        if not self.version_file.exists():
            with open(self.version_file, 'w') as f:
                json.dump({"models": {}}, f, indent=2)
    
    def save_model(self, 
                   model: Any, 
                   name: str, 
                   metrics: Dict = None,
                   metadata: Dict = None) -> str:
        """Save trained model with metadata"""
        try:
            timestamp = datetime.now().isoformat()
            version = self._get_next_version(name)
            filename = f"{name}_v{version}_{int(datetime.now().timestamp())}.pkl"
            filepath = self.model_dir / filename
            
            # Save model
            joblib.dump(model, str(filepath))
            logger.info(f"✓ Model saved: {filename}")
            
            # Update version tracking
            with open(self.version_file, 'r') as f:
                versions = json.load(f)
            
            versions["models"][name] = {
                "current_version": version,
                "filepath": filename,
                "saved_at": timestamp,
                "metrics": metrics or {},
                "metadata": metadata or {}
            }
            
            with open(self.version_file, 'w') as f:
                json.dump(versions, f, indent=2)
            
            logger.info(f"✓ Version {version} tracked for {name}")
            return str(filepath)
        
        except Exception as e:
            logger.error(f"✗ Failed to save model: {e}")
            return None
    
    def load_model(self, name: str, version: Optional[int] = None) -> Optional[Any]:
        """Load model by name and optional version"""
        try:
            with open(self.version_file, 'r') as f:
                versions = json.load(f)
            
            if name not in versions["models"]:
                logger.error(f"✗ No model found with name: {name}")
                return None
            
            model_info = versions["models"][name]
            filepath = self.model_dir / model_info["filepath"]
            
            if not filepath.exists():
                logger.error(f"✗ Model file not found: {filepath}")
                return None
            
            model = joblib.load(str(filepath))
            logger.info(f"✓ Model loaded: {name} v{model_info['current_version']}")
            
            # Log metrics
            if model_info.get("metrics"):
                logger.info(f"  Metrics: {model_info['metrics']}")
            
            return model
        
        except Exception as e:
            logger.error(f"✗ Failed to load model: {e}")
            return None
    
    def list_models(self) -> Dict:
        """List all saved models"""
        try:
            with open(self.version_file, 'r') as f:
                versions = json.load(f)
            
            models_info = {}
            for name, info in versions["models"].items():
                models_info[name] = {
                    "version": info["current_version"],
                    "saved_at": info["saved_at"],
                    "metrics": info.get("metrics", {})
                }
            
            logger.info(f"✓ Found {len(models_info)} saved models")
            return models_info
        
        except Exception as e:
            logger.error(f"✗ Failed to list models: {e}")
            return {}
    
    def delete_model(self, name: str) -> bool:
        """Delete a saved model"""
        try:
            with open(self.version_file, 'r') as f:
                versions = json.load(f)
            
            if name not in versions["models"]:
                logger.warning(f"Model {name} not found")
                return False
            
            filepath = self.model_dir / versions["models"][name]["filepath"]
            if filepath.exists():
                filepath.unlink()
                logger.info(f"✓ Model file deleted: {name}")
            
            del versions["models"][name]
            
            with open(self.version_file, 'w') as f:
                json.dump(versions, f, indent=2)
            
            logger.info(f"✓ Model entry removed: {name}")
            return True
        
        except Exception as e:
            logger.error(f"✗ Failed to delete model: {e}")
            return False
    
    def get_model_info(self, name: str) -> Optional[Dict]:
        """Get detailed info about a model"""
        try:
            with open(self.version_file, 'r') as f:
                versions = json.load(f)
            
            if name not in versions["models"]:
                return None
            
            info = versions["models"][name]
            return {
                "name": name,
                "version": info["current_version"],
                "saved_at": info["saved_at"],
                "filepath": info["filepath"],
                "metrics": info.get("metrics", {}),
                "metadata": info.get("metadata", {})
            }
        
        except Exception as e:
            logger.error(f"✗ Failed to get model info: {e}")
            return None
    
    def _get_next_version(self, name: str) -> int:
        """Calculate next version number"""
        try:
            with open(self.version_file, 'r') as f:
                versions = json.load(f)
            
            if name not in versions["models"]:
                return 1
            
            return versions["models"][name]["current_version"] + 1
        
        except Exception as e:
            logger.error(f"Error getting next version: {e}")
            return 1
    
    def save_feature_importance(self, importance_dict: Dict, name: str) -> bool:
        """Save feature importance data"""
        try:
            filename = f"{name}_importance_{int(datetime.now().timestamp())}.json"
            filepath = self.model_dir / filename
            
            with open(filepath, 'w') as f:
                json.dump(importance_dict, f, indent=2)
            
            logger.info(f"✓ Feature importance saved: {filename}")
            return True
        
        except Exception as e:
            logger.error(f"✗ Failed to save feature importance: {e}")
            return False
    
    def save_predictions(self, predictions: list, name: str) -> bool:
        """Save prediction results"""
        try:
            filename = f"{name}_predictions_{int(datetime.now().timestamp())}.json"
            filepath = self.model_dir / filename
            
            # Convert numpy arrays to lists for JSON serialization
            serializable_predictions = []
            for pred in predictions:
                if hasattr(pred, 'tolist'):
                    serializable_predictions.append(pred.tolist())
                else:
                    serializable_predictions.append(pred)
            
            with open(filepath, 'w') as f:
                json.dump(serializable_predictions, f, indent=2)
            
            logger.info(f"✓ Predictions saved: {filename}")
            return True
        
        except Exception as e:
            logger.error(f"✗ Failed to save predictions: {e}")
            return False


def example_usage():
    """Example of using ModelPersistence"""
    from sklearn.ensemble import RandomForestClassifier
    
    persistence = ModelPersistence("models")
    
    # Create a sample model
    model = RandomForestClassifier(n_estimators=10)
    X = [[1, 2], [3, 4], [5, 6]]
    y = [0, 1, 0]
    model.fit(X, y)
    
    # Save model
    persistence.save_model(
        model, 
        "trading_classifier",
        metrics={"accuracy": 0.85, "precision": 0.90},
        metadata={"data_source": "historical_trading"}
    )
    
    # List models
    models = persistence.list_models()
    print("Saved models:", models)
    
    # Load model
    loaded_model = persistence.load_model("trading_classifier")
    print("Model loaded successfully" if loaded_model else "Failed to load model")
    
    # Get model info
    info = persistence.get_model_info("trading_classifier")
    print("Model info:", info)


if __name__ == "__main__":
    example_usage()
