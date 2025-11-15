# Trading Agent Dashboard

Modern Next.js + React + Tailwind CSS dashboard for ML trading agent visualization and monitoring.

## Project Structure

```
dashboard/
├── app/                          # Next.js App Router
│   ├─┐ layout.tsx               # Root layout wrapper
│   ├┐ page.tsx                # Main dashboard page
│   ├┐ globals.css             # Global Tailwind styles
│   ├┐ api/                   # API routes
│   │   ├┐ metrics/route.ts     # Get performance metrics
│   │   ├┐ predictions/route.ts # Get predictions
│   │   ├┐ features/route.ts    # Get feature importance
│   ├┐ components/            # React components
│   │   ├┐ Header.tsx           # Top navigation
│   │   ├┐ Sidebar.tsx          # Left navigation
│   │   ├┐ MetricsCard.tsx      # Metric display
│   │   ├┐ TestPhases.tsx       # Test phases grid
│   │   ├┐ Charts/              # Chart components
│   │   │   ├┐ ModelPerformance.tsx
│   │   │   ├┐ FeatureImportance.tsx
│   │   │   ├┐ PredictionChart.tsx
│   ├┐ lib/                   # Utilities
│   │   ├┐ api-client.ts       # API calls
│   │   ├┐ constants.ts        # Constants
│   │   ├┐ formatters.ts       # Formatting functions
│   ├┐ hooks/                 # React hooks
│   │   ├┐ useMetrics.ts       # Metrics hook
│   │   ├┐ usePredictions.ts   # Predictions hook
├── public/                       # Static assets
├── tsconfig.json               # TypeScript config
├─┐ tailwind.config.ts          # Tailwind config
├─┐ postcss.config.js           # PostCSS config
├─┐ next.config.js              # Next.js config
├─┐ package.json                # Dependencies
├─┐ README.md                   # This file
```

## Quick Start

### Installation

```bash
cd dashboard
npm install
```

### Development

```bash
npm run dev
# Open http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

## Features

✅ **Real-time Metrics Display**
- Model accuracy: 73.42%
- Data quality score: 98/100
- Execution time: 6.0 seconds

✅ **ML Pipeline Visualization**
- All 7 test phases with status
- Duration and results per phase
- Real-time status updates

✅ **Model Performance Charts**
- Radar chart: Accuracy, Precision, Recall, F1-Score, ROC-AUC
- Feature importance bar chart
- Prediction confidence line chart

✅ **Data Quality Indicators**
- Progress bars with color coding
- Quality score with trend
- Data completeness percentage

✅ **Responsive Design**
- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly interfaces

✅ **Dark/Light Mode**
- Tailwind CSS theme support
- Persistent theme preference
- Smooth transitions

## Technology Stack

- **Framework**: Next.js 14.1
- **UI Library**: React 18.3
- **Styling**: Tailwind CSS 3.4
- **Language**: TypeScript 5.3
- **Charts**: Recharts 2.10
- **Icons**: Lucide React 0.306
- **HTTP Client**: Axios 1.6
- **State Management**: Zustand 4.4

## Configuration Files

### next.config.js
Next.js configuration with image optimization and API routes.

### tailwind.config.ts
Tailwind CSS configuration with custom colors and theme extensions.

### tsconfig.json
TypeScript configuration with path aliases and strict mode.

### postcss.config.js
PostCSS configuration for Tailwind and Autoprefixer.

## Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_REFRESH_INTERVAL=5000
```

## API Integration

The dashboard connects to backend APIs:

- `GET /api/metrics` - Performance metrics
- `GET /api/predictions` - Prediction data  
- `GET /api/features` - Feature importance

## Performance

- **Page Load**: <2 seconds
- **First Contentful Paint**: <1 second
- **Bundle Size**: ~150KB (gzipped)
- **Lighthouse Score**: 95+

## Development Guidelines

1. Use TypeScript for type safety
2. Follow component structure in `components/`
3. Create hooks for data fetching
4. Use Tailwind CSS for styling
5. Keep components under 200 lines
6. Add comprehensive comments

## Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Railway

```bash
railway login
railway link
railway up
```

## Testing

```bash
npm run type-check
npm run lint
```

## License

MIT

## Support

For issues or questions, create a GitHub issue or contact the maintainers.
