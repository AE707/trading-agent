#!/usr/bin/env python3
"""
Prediction Logging & Tracking Module
Records model predictions and tracks accuracy over time
"""

import json
import logging
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional
import pandas as pd

logger = logging.getLogger(__name__)


class PredictionLogger:
    """Log and track model predictions for accuracy analysis"""
    
    def __init__(self, log_dir: str = "logs", model_name: str = "trading_model"):
        self.log_dir = Path(log_dir)
        self.log_dir.mkdir(exist_ok=True)
        self.model_name = model_name
        self.predictions_file = self.log_dir / f"{model_name}_predictions.jsonl"
        self.summary_file = self.log_dir / f"{model_name}_summary.json"
        self.accuracy_history = []
    
    def log_prediction(self, 
                      prediction: float,
                      actual: Optional[float] = None,
                      confidence: float = 0.5,
                      metadata: Dict = None) -> bool:
        """Log a single prediction"""
        try:
            record = {
                "timestamp": datetime.now().isoformat(),
                "prediction": float(prediction),
                "actual": float(actual) if actual is not None else None,
                "confidence": float(confidence),
                "correct": (prediction == actual) if actual is not None else None,
                "metadata": metadata or {}
            }
            
            with open(self.predictions_file, 'a') as f:
                f.write(json.dumps(record) + '\n')
            
            logger.debug(f"✓ Prediction logged: {prediction} (confidence: {confidence:.2f})")
            return True
        
        except Exception as e:
            logger.error(f"✗ Failed to log prediction: {e}")
            return False
    
    def log_batch_predictions(self, predictions: List[Dict]) -> int:
        """Log multiple predictions at once"""
        count = 0
        try:
            for pred in predictions:
                if self.log_prediction(
                    prediction=pred.get('prediction'),
                    actual=pred.get('actual'),
                    confidence=pred.get('confidence', 0.5),
                    metadata=pred.get('metadata')
                ):
                    count += 1
            
            logger.info(f"✓ Logged {count} predictions")
            return count
        
        except Exception as e:
            logger.error(f"✗ Error logging batch predictions: {e}")
            return count
    
    def calculate_accuracy(self, recent_n: Optional[int] = None) -> float:
        """Calculate prediction accuracy"""
        try:
            predictions = self.read_predictions()
            if not predictions:
                return 0.0
            
            if recent_n:
                predictions = predictions[-recent_n:]
            
            correct = sum(1 for p in predictions if p.get('correct') is True)
            accuracy = (correct / len(predictions)) * 100 if predictions else 0.0
            
            logger.info(f"✓ Accuracy: {accuracy:.2f}% ({correct}/{len(predictions)})")
            return accuracy
        
        except Exception as e:
            logger.error(f"✗ Error calculating accuracy: {e}")
            return 0.0
    
    def calculate_confidence_calibration(self) -> Dict:
        """Analyze confidence vs accuracy calibration"""
        try:
            predictions = self.read_predictions()
            if not predictions:
                return {}
            
            # Group by confidence ranges
            calibration = {}
            for confidence_range in ["0.5-0.6", "0.6-0.7", "0.7-0.8", "0.8-0.9", "0.9-1.0"]:
                ranges = confidence_range.split("-")
                low, high = float(ranges[0]), float(ranges[1])
                
                preds_in_range = [
                    p for p in predictions
                    if low <= p.get('confidence', 0) <= high and p.get('correct') is not None
                ]
                
                if preds_in_range:
                    accuracy = sum(1 for p in preds_in_range if p['correct']) / len(preds_in_range) * 100
                    calibration[confidence_range] = {
                        "accuracy": accuracy,
                        "count": len(preds_in_range),
                        "avg_confidence": sum(p['confidence'] for p in preds_in_range) / len(preds_in_range)
                    }
            
            logger.info(f"✓ Calibration analysis: {calibration}")
            return calibration
        
        except Exception as e:
            logger.error(f"✗ Error calculating calibration: {e}")
            return {}
    
    def generate_summary(self) -> Dict:
        """Generate prediction summary statistics"""
        try:
            predictions = self.read_predictions()
            if not predictions:
                return {}
            
            total_predictions = len(predictions)
            verified = sum(1 for p in predictions if p.get('actual') is not None)
            correct = sum(1 for p in predictions if p.get('correct') is True)
            
            summary = {
                "model_name": self.model_name,
                "generated_at": datetime.now().isoformat(),
                "total_predictions": total_predictions,
                "verified_predictions": verified,
                "correct_predictions": correct,
                "overall_accuracy": (correct / verified * 100) if verified > 0 else 0,
                "avg_confidence": sum(p['confidence'] for p in predictions) / total_predictions,
                "calibration": self.calculate_confidence_calibration(),
                "latest_10_predictions": predictions[-10:] if predictions else []
            }
            
            with open(self.summary_file, 'w') as f:
                json.dump(summary, f, indent=2, default=str)
            
            logger.info(f"✓ Summary generated: {summary['overall_accuracy']:.2f}% accuracy")
            return summary
        
        except Exception as e:
            logger.error(f"✗ Error generating summary: {e}")
            return {}
    
    def read_predictions(self, limit: Optional[int] = None) -> List[Dict]:
        """Read all logged predictions"""
        try:
            if not self.predictions_file.exists():
                return []
            
            predictions = []
            with open(self.predictions_file, 'r') as f:
                for line in f:
                    if line.strip():
                        predictions.append(json.loads(line))
            
            if limit:
                predictions = predictions[-limit:]
            
            return predictions
        
        except Exception as e:
            logger.error(f"✗ Error reading predictions: {e}")
            return []
    
    def export_to_csv(self, output_file: Optional[str] = None) -> bool:
        """Export predictions to CSV for analysis"""
        try:
            predictions = self.read_predictions()
            if not predictions:
                return False
            
            df = pd.DataFrame(predictions)
            output_path = output_file or self.log_dir / f"{self.model_name}_predictions.csv"
            df.to_csv(output_path, index=False)
            
            logger.info(f"✓ Exported {len(predictions)} predictions to {output_path}")
            return True
        
        except Exception as e:
            logger.error(f"✗ Error exporting to CSV: {e}")
            return False
    
    def get_statistics(self) -> Dict:
        """Get comprehensive statistics"""
        predictions = self.read_predictions()
        verified = [p for p in predictions if p.get('actual') is not None]
        confidences = [p['confidence'] for p in predictions]
        
        return {
            "total_predictions": len(predictions),
            "verified_predictions": len(verified),
            "accuracy": self.calculate_accuracy(),
            "min_confidence": min(confidences) if confidences else 0,
            "max_confidence": max(confidences) if confidences else 0,
            "avg_confidence": sum(confidences) / len(confidences) if confidences else 0,
            "calibration": self.calculate_confidence_calibration()
        }


if __name__ == "__main__":
    logger = PredictionLogger(log_dir="logs", model_name="trading_model")
    
    # Log some sample predictions
    sample_preds = [
        {"prediction": 1, "actual": 1, "confidence": 0.95, "metadata": {"signal": "BUY"}},
        {"prediction": 0, "actual": 0, "confidence": 0.87, "metadata": {"signal": "HOLD"}},
        {"prediction": 1, "actual": 0, "confidence": 0.72, "metadata": {"signal": "BUY"}},
    ]
    
    logger.log_batch_predictions(sample_preds)
    summary = logger.generate_summary()
    print("Summary:", json.dumps(summary, indent=2, default=str))
