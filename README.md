# EventApp - Event Ticketing Platform

A modern, production-quality event ticketing web application built with Next.js Pages Router, TypeScript, Redux Toolkit, and Tailwind CSS.

## 🎯 Project Overview

EventApp is a full-stack event discovery and ticketing platform where users can:
- Browse events across different categories (concerts, theater, sports, conferences)
- Filter events by search, category, and city
- View detailed event information with interactive seat selection
- Book tickets through a secure 3-step checkout process
- Manage their profile and view order history

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (Pages Router) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS v4 |
| **State Management** | Redux Toolkit + redux-persist |
| **HTTP Client** | Native `fetch` with custom typed wrapper |
| **Runtime** | React 19 |
| **Testing** | Jest 30.4.2 + React Testing Library 16.3.2 |
| **Location Data** | turkey-neighbourhoods (81 cities, 973 districts) |

## 📁 Project Structure

```
event-app/
├── components/
│   ├── ui/                 # Primitive components (Button, Input, Badge, etc.)
│   ├── layout/             # Layout components (Navbar, Footer, ProfileLayout)
│   ├── events/             # Event-specific components (EventCard, SeatSelector, LocationDropdown)
│   ├── checkout/           # Checkout flow components (3 steps)
│   └── auth/               # Authentication components (withAuth HOC)
├── hooks/                  # Custom React hooks (useDebounce, useLocalStorage, etc.)
├── pages/
│   ├── api/                # API routes (events, auth, checkout)
│   ├── event/              # Event detail pages ([slug].tsx)
│   ├── profile/            # Protected profile pages (orders, settings)
│   ├── checkout/           # Checkout flow
│   └── index.tsx           # Home page
├── services/               # API service layer (eventService, authService)
├── store/
│   ├── slices/             # Redux slices (auth, event, checkout, order)
│   └── selectors/          # Reusable selectors for state access
├── types/                  # TypeScript type definitions
├── data/                   # Mock data (events.json, locations.ts)
├── constants/              # App-wide constants (routes, validation, mock data)
├── utils/                  # Utility functions (format, validation, helpers)
└── lib/                    # Core libraries (fetch wrapper)
```

## ✨ Features

### Core Features (All Implemented ✅)

#### 1. **Event Listing Page** (`/`)
- Server-side rendering with `getServerSideProps`
- Displays all events with cards showing key information
- Handles loading, error, and empty states
- Responsive grid layout

#### 2. **Event Filtering**
- **Search**: Debounced search (400ms, min 3 characters)
- **Category Filter**: URL-based with shallow routing
- **City Filter**: Persisted to `localStorage`, synced on mount
- Request cancellation via `AbortController`

#### 3. **Event Detail Page** (`/event/[slug]`)
- Static generation with `getStaticProps` and `getStaticPaths`
- Full event information display
- Interactive seat selector with visual seat map
- Real-time price calculation
- Graceful 404 handling

#### 4. **Authentication**
- Mock authentication system
- Login page with form validation
- Protected routes with HOC (`withAuth`)
- Redux state persistence via `redux-persist`
- Auto-redirect with `returnUrl` support

**Test Credentials:**
- Email: `test@test.com`
- Password: `password123`

#### 5. **3-Step Checkout Flow** (Protected)
- **Step 1**: Review selected seats and total price
- **Step 2**: Personal information (name, email, phone)
- **Step 3**: Payment details (card number, expiry, CVV)
- Form validation at each step
- State preservation on back navigation
- Order confirmation screen

#### 6. **Profile Section** (Protected)
- Profile overview page
- Orders history page
- Sidebar navigation with active state
- Responsive layout

#### 7. **Type-Safe API Layer**
- 4 API routes implemented:
  - `GET /api/events` - List events with filters
  - `GET /api/events/[slug]` - Single event
  - `POST /api/auth/login` - User authentication
  - `POST /api/checkout` - Order submission
- Consistent response shape: `{ data: T } | { error: string }`
- Proper HTTP status codes and error handling

#### 8. **Redux State Management**
- **authSlice**: User authentication (persisted)
- **eventSlice**: Event data (not persisted)
- **checkoutSlice**: Checkout flow (not persisted)
- **orderSlice**: Order history (persisted)
- Typed hooks: `useAppDispatch`, `useAppSelector`
- Async thunks with proper error handling
- Centralized selectors for computed state

### Bonus Features (All Implemented ✅)

#### 1. **Interactive Seat Selection**
- Visual seat map with row/number grid
- Color-coded availability states (available, selected, unavailable)
- Click-to-select interaction with immediate visual feedback
- Real-time price calculation based on selections
- Responsive grid layout

#### 2. **Cascading Location Dropdown**
- Two-level cascade: City → District
- **81 real Turkish cities** using `turkey-neighbourhoods` library
- **973 districts** dynamically filtered by selected city
- Reset logic: district clears when city changes
- Used in checkout address collection (Step 2)

#### 3. **Persistent URL Filters**
- Category and city filters reflected in URL query params
- Shallow routing prevents full page reload
- City filter persists to `localStorage` for session continuity
- URL state syncs on page load

#### 4. **Order History Management**
- All orders persisted via Redux + `redux-persist`
- Display full order details: event, seats, price, date, delivery address
- Accessible via `/profile/orders` (protected route)
- Survives page refresh and browser restart

#### 5. **Unit Tests**
- **Jest 30.4.2** + **React Testing Library 16.3.2**
- **19 passing tests** across 3 test suites:
  - `useDebounce` hook (5 tests)
  - `authSlice` reducer (8 tests)
  - `withAuth` HOC (6 tests)
- `act()` warnings eliminated with proper timer handling

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd event-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Run Tests

```bash
npm test              # Run all tests
npm test -- --watch   # Watch mode
npm test -- --coverage # Coverage report
```

### Type Checking

```bash
npx tsc --noEmit
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub:**
```bash
git add .
git commit -m "feat: production ready"
git push origin main
```

2. **Deploy on Vercel:**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Click "Deploy"

**Automatic deployments:**
- Every push to `main` → Production
- Every PR → Preview URL

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

See `DEPLOYMENT.md` for detailed guide and troubleshooting.

## 📋 Quality Checklist

### Code Quality
- ✅ `tsc --noEmit` - Zero TypeScript errors
- ✅ All API routes return typed `NextApiResponse<T>`
- ✅ No `any` types anywhere
- ✅ All utilities have JSDoc documentation
- ✅ Centralized constants (no magic strings)
- ✅ DRY principles (format/validation functions reused)

### Architecture
- ✅ `redux-persist` only on auth and orders slices
- ✅ Native fetch wrapper used everywhere - zero axios imports
- ✅ All thunks handle `pending` / `fulfilled` / `rejected`
- ✅ `AbortError` is re-thrown in thunks
- ✅ Selectors centralize state access logic

### Frontend
- ✅ All list pages handle loading / error / empty states
- ✅ Protected pages redirect unauthenticated users
- ✅ Debounce fires only after 3+ characters with 400ms delay
- ✅ `typeof window !== 'undefined'` guard on all localStorage access
- ✅ Checkout form validates each step before progression

### Testing
- ✅ 19/19 tests passing
- ✅ `act()` warnings eliminated
- ✅ Mock implementation for next/router
- ✅ Fake timers for debounce testing

## 🎨 Key Implementation Patterns

### Production-Level Utilities
- **Constants Module** (`constants/`): Centralized app-wide constants (routes, storage keys, validation patterns)
- **Format Utilities** (`utils/format.ts`): Currency, date, and phone formatting functions
- **Validation Utilities** (`utils/validation.ts`): Email, phone, card validation helpers
- **Enhanced Fetch** (`lib/fetch.ts`): Timeout support and custom error handling

### Core Patterns
- **Debounced Search**: 400ms delay, 3-character minimum, AbortController for cancellation
- **Protected Routes**: HOC-based authentication guard with returnUrl support
- **SSR-Safe localStorage**: `typeof window !== 'undefined'` guard on all client-side storage

## 🤖 AI Usage Disclosure

This project was developed with AI assistance (GitHub Copilot CLI) for:
- Boilerplate generation (type definitions, Redux slices)
- Component scaffolding and structure
- Best practices implementation
- Code consistency and patterns

All architectural decisions, implementation logic, and code quality standards were human-defined based on the project requirements.

## 📊 Project Statistics

### Code Metrics
- **~3,700 Lines of Code** (TypeScript/TSX)
  - Components: ~1,300 LOC
  - Pages: ~820 LOC
  - Redux Store: ~420 LOC
  - Utilities: ~420 LOC
  - Tests: ~410 LOC

### Features & Data
- **12 Events** in mock database
- **4 Categories**: Concert, Theater, Sports, Conference
- **81 Cities** from turkey-neighbourhoods library
- **973 Districts** with cascading dropdown support

### Architecture
- **20+ Components** organized by domain
- **5+ Custom Hooks** for reusable logic
- **4 Redux Slices** with full type safety
- **30+ Selectors** for computed state access
- **4 API Routes** with consistent response shapes
- **19 Passing Tests** with 100% success rate
- **3 Utility Modules** (constants, utils, lib)
- **Zero TypeScript errors** in strict mode

## 🔮 Known Limitations & Future Improvements

### Current Limitations
1. Mock data only - no real database integration
2. No actual payment processing
3. No email notifications
4. Limited seat map visualization (grid-based)

### Planned Improvements
1. **Backend Integration**
   - PostgreSQL database with Prisma ORM
   - Real payment gateway (Stripe/Iyzico)
   - Order persistence and management

2. **Enhanced Features**
   - Email confirmations via SendGrid
   - QR code ticket generation
   - Real-time seat availability via WebSockets
   - Multi-language support (i18n)

3. **Performance**
   - Image optimization with next/image
   - ISR (Incremental Static Regeneration) for events
   - CDN caching strategy
   - Bundle size optimization

4. **User Experience**
   - Dark mode support
   - Accessibility improvements (WCAG AA)
   - Progressive Web App (PWA) features
   - Advanced filtering (price range, date range)

## 📝 License

This project is for educational and portfolio purposes.

## 👤 Author

Built as a case study to demonstrate full-stack development capabilities with modern web technologies.

---

**Last Updated**: June 2, 2026
