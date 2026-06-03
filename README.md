# EventApp - Event Ticketing Platform

Modern event ticketing platform built with **Next.js 16**, **TypeScript**, **Redux Toolkit**, and **Tailwind CSS v4**.

## 🎯 Overview

Full-stack event discovery platform with:
- Browse & filter events (search, category, city)
- Interactive seat selection
- 3-step checkout with address collection
- Protected profile & order history
- Real Turkish location data (81 cities, 973 districts)

## 🛠 Tech Stack

**Frontend:** Next.js 16 (Pages Router) • React 19 • TypeScript (strict) • Tailwind CSS v4  
**State:** Redux Toolkit • redux-persist  
**Testing:** Jest 30 • React Testing Library 16  
**Data:** turkey-neighbourhoods library

## 📁 Project Structure

```
components/
├── ui/         # Button, Input, Badge, Spinner, etc.
├── layout/     # Navbar, Footer, ProfileLayout
├── events/     # EventCard, SeatSelector, LocationDropdown
├── checkout/   # 3-step checkout flow
└── auth/       # withAuth HOC

pages/
├── api/        # 4 API routes (events, auth, checkout)
├── event/      # [slug].tsx - Event detail (SSG)
├── profile/    # Protected pages (orders, settings)
└── checkout/   # 3-step checkout flow

store/
├── slices/     # auth, event, checkout, order
└── selectors/  # Computed state

data/           # events.json, locations.ts
types/          # TypeScript definitions
hooks/          # useDebounce, useLocalStorage, etc.
services/       # API layer
constants/      # Routes, validation patterns
utils/          # Format, validation helpers
```

## ✨ Features

- 🏠 Event listing (SSR) with search, category & city filters
- 📄 Event detail pages (SSG) with interactive seat selection
- 💺 Visual seat map with real-time pricing
- 🔐 Mock authentication (test@test.com / password123)
- 🛒 3-step checkout (seats → info → payment)
- 📍 Cascading location dropdown (81 cities, 973 districts)
- 👤 Protected profile with order history
- 🔗 URL-based filters with localStorage persistence
- 💾 Order persistence via redux-persist
- 🌐 4 API routes with TypeScript
- ✅ 19 passing tests (Jest + RTL)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
# → http://localhost:3000

# Run tests
npm test

# Build for production
npm run build
npm start
```

## 🌐 Deployment

**Vercel (Recommended):**
1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Deploy (auto-configured)

See `DEPLOYMENT.md` for detailed guide.

## 📊 Statistics

- **71 TypeScript files** • Zero errors (strict mode)
- **20+ Components** organized by domain
- **19/19 Tests passing** (100% success rate)
- **4 Redux slices** with full type safety
- **12 Events** across 4 categories

---

**Built with AI assistance** • Educational & portfolio purposes • June 2026
