# HTML & CSS Architecture Documentation

## Project Overview
This document provides a comprehensive guide to the HTML structure and CSS architecture used throughout the Trading Agent Dashboard. The dashboard uses **React 18** with **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS** for styling.

## HTML Structure

### Root Layout (layout.tsx)

The main HTML structure is defined in `dashboard/app/layout.tsx`:

```html
<html lang="en">
  <body className="bg-slate-900 text-slate-50 antialiased">
    {/* Header */}
    <Header />
    
    {/* Main Layout Container */}
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Sidebar - Fixed on left */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-auto flex flex-col">
        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
    
    {/* Footer */}
    <Footer />
  </body>
</html>
```

### HTML Hierarchy

**Level 1 (Root):**
- `<html>` - Root element with `lang="en"`
- `<body>` - Body wrapper with Tailwind classes for styling

**Level 2 (Page Structure):**
- `<Header>` - Navigation and branding component
- `<div>` - Flex container for sidebar + main content layout
- `<Footer>` - Footer component

**Level 3 (Layout Content):**
- `<Sidebar>` - Left navigation sidebar (fixed positioning)
- `<main>` - Primary content container
- `<div>` - Flex-col wrapper for content

**Level 4 (Page Content):**
- `{children}` - Dynamic page content injected by Next.js routing

## CSS Architecture

### Design System

**Color Scheme (Dark Mode):**
- Background: `bg-slate-900` (primary), `bg-slate-800` (secondary)
- Text: `text-slate-50` (primary), `text-slate-400` (secondary)
- Accent: `from-slate-900`, `to-slate-900` (gradients)
- Interactive: Blue, cyan, and emerald colors for buttons/alerts

**Typography:**
- Base: `antialiased` for smooth text rendering
- Font sizes: `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`
- Weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Tailwind CSS Utility Classes

#### Layout Utilities
- **Flexbox:** `flex`, `flex-col`, `flex-row`, `justify-between`, `items-center`, `gap-*`
- **Sizing:** `w-*`, `h-*`, `h-screen`
- **Spacing:** `p-*`, `m-*`, `space-*`
- **Positioning:** `fixed`, `absolute`, `relative`, `sticky`
- **Overflow:** `overflow-auto`, `overflow-hidden`, `overflow-x-scroll`
- **Display:** `flex`, `grid`, `hidden`, `block`

#### Visual Effects
- **Backgrounds:** `bg-gradient-to-br` (gradient direction)
- **Borders:** `border`, `border-*`, `border-slate-700`, `border-slate-600`
- **Shadows:** `shadow-lg`, `shadow-md`, `shadow-slate-900`
- **Opacity:** `opacity-*`
- **Transforms:** `scale-`, `rotate-`, `translate-`

#### Interactive States
- **Hover:** `hover:bg-slate-800`, `hover:text-cyan-400`
- **Focus:** `focus:outline-none`, `focus:ring-2`
- **Active:** `active:scale-95`
- **Disabled:** `disabled:opacity-50`, `disabled:cursor-not-allowed`

### Component Styling Examples

#### Header Component
```tsx
// bg-slate-950 - Very dark background
// border-b border-slate-700 - Bottom border separator
// flex items-center justify-between - Flex layout
// px-8 py-4 - Padding
<header className="bg-slate-950 border-b border-slate-700 flex items-center justify-between px-8 py-4">
  {/* Logo and Navigation */}
</header>
```

#### Sidebar Component
```tsx
// w-64 - Fixed width sidebar
// bg-slate-800 - Dark background
// border-r border-slate-700 - Right border
// sticky top-0 - Sticky positioning
// h-screen - Full viewport height
<aside className="w-64 bg-slate-800 border-r border-slate-700 sticky top-0 h-screen overflow-y-auto">
  {/* Navigation items */}
</aside>
```

#### Card Components
```tsx
// bg-slate-800/50 - Semi-transparent background
// backdrop-blur - Glassmorphism effect
// border border-slate-700/50 - Subtle border
// rounded-lg - Rounded corners
// p-6 - Internal padding
// hover:shadow-lg - Hover effect
<div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-6 hover:shadow-lg transition-shadow">
  {/* Card content */}
</div>
```

## Responsive Design

### Breakpoints (Tailwind Default)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Responsive Patterns
```tsx
// Hide on small screens, show on medium and up
className="hidden md:block"

// Responsive padding
className="p-4 md:p-6 lg:p-8"

// Responsive grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4"

// Responsive text size
className="text-lg md:text-xl lg:text-2xl"
```

## Component Architecture

### Component Organization
```
dashboard/
├── app/
│   ├── layout.tsx (Root layout with Header, Sidebar, Footer)
│   ├── page.tsx (Main dashboard page)
│   ├── metrics/
│   │   └── page.tsx (Metrics page with charts)
│   ├── components/
│   │   ├── Header.tsx (Navigation header)
│   │   ├── Sidebar.tsx (Side navigation)
│   │   ├── Footer.tsx (Footer section)
│   │   ├── MarketTicker.tsx (Market data display)
│   │   ├── TradeStatusBadge.tsx (Status indicator)
│   │   ├── PortfolioPieChart.tsx (Portfolio visualization)
│   │   └── ... (30+ other components)
│   ├── dashboard.css (Global component styles)
│   └── globals.css (Global Tailwind styles)
└── tailwind.config.ts (Tailwind configuration)
```

### Styling Approach
1. **Tailwind CSS Utilities** - Primary styling method (90% of styling)
2. **CSS Modules** - For component-specific scoped styles (if needed)
3. **Inline Styles** - Minimal use, only for dynamic values
4. **Global CSS** - Base styles and resets in `globals.css`

## Key CSS Features

### Glassmorphism Effects
```tsx
className="bg-slate-800/50 backdrop-blur border border-slate-700/50"
// Creates a frosted glass effect with transparency and blur
```

### Dark Mode
- Built-in via Tailwind dark mode
- All colors use slate palette for consistency
- No light mode colors in codebase (dark mode only)

### Animation and Transitions
```tsx
// Smooth transitions
className="transition-all duration-300"

// Scale animations
className="hover:scale-105 active:scale-95"

// Fade transitions
className="opacity-0 hover:opacity-100 transition-opacity"
```

### Spacing System
- Uses Tailwind's rem-based spacing scale
- 1 unit = 0.25rem (4px)
- Common values: `p-2` (8px), `p-4` (16px), `p-6` (24px), `p-8` (32px)

## HTML Elements Used

### Semantic Elements
- `<html>` - Root document element
- `<body>` - Document body
- `<header>` - Header/navigation region
- `<main>` - Main content region
- `<footer>` - Footer region
- `<nav>` - Navigation container
- `<section>` - Content sections
- `<article>` - Self-contained content

### Structural Elements
- `<div>` - Generic container (most common)
- `<span>` - Inline text wrapper
- `<ul>`, `<ol>`, `<li>` - Lists
- `<form>` - Form containers
- `<button>` - Interactive buttons
- `<input>` - Form inputs

### Media Elements
- `<img>` - Images
- `<svg>` - Inline SVG graphics
- `<canvas>` - Canvas for charts (via Recharts)

## CSS Configuration

### tailwind.config.ts
- Custom theme extensions
- Plugin integrations
- Content purging for production
- Dark mode enabled

### globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom base styles */
/* Global resets and font definitions */
```

## Summary

The Trading Agent Dashboard uses a **modern React+Tailwind architecture** with:
- ✅ Semantic HTML structure
- ✅ Comprehensive CSS via Tailwind utilities
- ✅ Dark mode by default
- ✅ Responsive design
- ✅ Component-based architecture
- ✅ Type-safe React/TypeScript

HTML elements provide semantic meaning and accessibility, while Tailwind CSS provides all visual styling through utility classes applied directly to elements. This approach eliminates the need for separate CSS files for most styling while maintaining clean, readable code.
