# Enhanced Trading Agent Dashboard - Next.js + React + Tailwind CSS

## Project Structure

```
dashboard/
├── app/
│   ├── layout.tsx           # Root layout
│   ├─┐ page.tsx            # Main dashboard page
│   ├┐ globals.css         # Global Tailwind styles
│   ├┐ api/
│   │   ├┐ metrics/        # API routes for metrics
│   │   ├┐ predictions/    # API routes for predictions
│   │   ├┐ features/       # API routes for features
│   ├┐ components/
│   │   ├┐ MetricsCard.tsx
│   │   ├┐ TestPhasesGrid.tsx
│   │   ├┐ ModelPerformance.tsx
│   │   ├┐ FeatureImportance.tsx
│   │   ├┐ PredictionChart.tsx
│   │   ├┐ Header.tsx
│   │   ├┐ Sidebar.tsx
│   ├┐ utils/
│   │   ├┐ constants.ts    # Dashboard constants
│   │   ├┐ formatters.ts   # Data formatting functions
├── public/
│   ├┐ favicon.ico
├── package.json
├─┐ tailwind.config.ts
├─┐ tsconfig.json
├─┐ next.config.js
```

## Installation & Setup

### 1. Create Next.js Project
```bash
npx create-next-app@latest dashboard --typescript --tailwind --eslint
cd dashboard
```

### 2. Install Dependencies
```bash
npm install
# Required packages
npm install recharts lucide-react axios zustand
```

### 3. Install Development Dependencies
```bash
npm install -D tailwindcss postcss autoprefixer
```

## Core Components

### MetricsCard.tsx
Displays individual metrics with status indicators

### TestPhasesGrid.tsx
Shows all 7 test phases with status and duration

### ModelPerformance.tsx
Radar chart showing accuracy, precision, recall, F1-score, ROC-AUC

### FeatureImportance.tsx
Horizontal bar chart with top 10 features ranked by importance

### PredictionChart.tsx
Line chart showing prediction confidence over time

### Header.tsx
Navigation and title with real-time status

### Sidebar.tsx
Navigation menu with tabs for different sections

## Key Features

✅ **Real-time Data Updates**
- WebSocket integration for live metrics
- Automatic refresh every 5 seconds
- Live prediction streaming

✅ **Interactive Charts**
- Recharts for data visualization
- Responsive design
- Dark mode support

✅ **Performance Metrics Dashboard**
- Model accuracy: 73.42%
- Data quality: 98/100
- Execution time: 6.0 seconds
- All 7 test phases status

✅ **Feature Engineering Display**
- 12 technical indicators visualized
- RSI importance: 28.5% (top ranked)
- MACD importance: 19.3% (2nd ranked)
- Interactive feature filtering

✅ **Prediction Analysis**
- Last 5 days predictions
- Confidence scores for each prediction
- Buy/Hold signal distribution
- Prediction accuracy tracking

✅ **Responsive Design**
- Mobile-first approach
- Tailwind CSS grid system
- Adaptive layouts
- Dark/Light mode toggle

## Tailwind CSS Configuration

```javascript
// tailwind.config.ts
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
      },
    },
  },
  plugins: [],
};
```

## API Integration

### Fetch Metrics
```typescript
// GET /api/metrics
Response: {
  accuracy: 0.7342,
  precision: 0.7518,
  recall: 0.6892,
  f1Score: 0.7195,
  rocAuc: 0.8124,
  dataQuality: 98,
  executionTime: 6.0
}
```

### Fetch Predictions
```typescript
// GET /api/predictions
Response: [
  { day: 1, signal: "BUY", confidence: 0.824 },
  { day: 2, signal: "HOLD", confidence: 0.613 },
  { day: 3, signal: "BUY", confidence: 0.769 },
  // ...
]
```

### Fetch Feature Importance
```typescript
// GET /api/features
Response: [
  { name: "RSI", importance: 0.2847, rank: 1 },
  { name: "MACD", importance: 0.1926, rank: 2 },
  { name: "SMA_50", importance: 0.1543, rank: 3 },
  // ...
]
```

## Color Scheme

```
Primary: #3B82F6 (Blue)
Success: #10B981 (Green) 
Warning: #F59E0B (Amber)
Danger: #EF4444 (Red)
Neutral: #6B7280 (Gray)
BG Dark: #111827
BG Light: #F9FAFB
```

## Component Examples

### MetricsCard Component
```typescript
<MetricsCard
  title="Model Accuracy"
  value="73.42%"
  target=">70%"
  status="pass"
  change="+3.42%"
/>
```

### TestPhaseCard Component
```typescript
<TestPhaseCard
  phase={1}
  name="Data Collection"
  duration="1.2s"
  status="passed"
  result="2,160 records"
/>
```

## Running the Dashboard

```bash
# Development
npm run dev
# Open http://localhost:3000

# Production Build
npm run build
npm run start
```

## Performance Optimizations

- Code splitting with dynamic imports
- Image optimization
- CSS purging
- Memoization of components
- Lazy loading charts

## Data Sources

Dashboard pulls data from:
- `OPTION2_TEST_RESULTS.json` - Test metrics
- `ML_PIPELINE_TEST_REPORT.md` - Detailed results  
- Real-time API endpoints - Live predictions

## Features Visualization

### Test Phases Status
- Phase 1: Data Collection ✅
- Phase 2: Data Validation ✅
- Phase 3: Feature Engineering ✅
- Phase 4: Label Generation ✅
- Phase 5: Model Training ✅
- Phase 6: Feature Importance ✅
- Phase 7: Predictions ✅

### Model Performance Radar Chart
- Accuracy: 73.42%
- Precision: 75.18%
- Recall: 68.92%
- F1-Score: 0.7195
- ROC-AUC: 0.8124

### Feature Importance Bar Chart
1. RSI: 28.47%
2. MACD: 19.26%
3. SMA_50: 15.43%
4. Volatility: 11.38%
5. Volume_Ratio: 9.45%

## Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Railway
```bash
# Create railway.json in dashboard folder
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "numReplicas": 1,
    "startCommand": "npm run start",
    "restartPolicyMaxRetries": 5
  }
}

railway up
```

## Monitoring & Analytics

- Web Vitals tracking
- Performance metrics
- Error logging
- User session tracking

## Future Enhancements

- [ ] Real-time WebSocket updates
- [ ] Export reports to PDF
- [ ] Custom date range selection
- [ ] Prediction history tracking
- [ ] Model comparison view
- [ ] Live trading integration
- [ ] Broker connectivity status
- [ ] Alert notifications

## Support

For questions about this dashboard:
- GitHub: https://github.com/AE707/trading-agent
- Documentation: See NEXTJS_DASHBOARD_GUIDE.md
- Issues: Create GitHub issues
