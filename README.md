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

## 📁 Project Structure

```
event-app/
├── components/
│   ├── ui/                 # Primitive components (Button, Input, Badge, etc.)
│   ├── layout/             # Layout components (Navbar, Footer, ProfileLayout)
│   ├── events/             # Event-specific components
│   ├── checkout/           # Checkout flow components
│   └── auth/               # Authentication components
├── hooks/                  # Custom React hooks
├── pages/
│   ├── api/                # API routes
│   ├── event/              # Event detail pages
│   ├── profile/            # Protected profile pages
│   ├── checkout/           # Checkout flow
│   └── index.tsx           # Home page
├── services/               # API service layer
├── store/                  # Redux store and slices
├── types/                  # TypeScript type definitions
└── data/                   # Mock data
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
- Typed hooks: `useAppDispatch`, `useAppSelector`
- Async thunks with proper error handling

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

### Type Checking

```bash
npx tsc --noEmit
```

## 📋 Quality Checklist

- ✅ `tsc --noEmit` - Zero TypeScript errors
- ✅ All API routes return typed `NextApiResponse<T>`
- ✅ No `any` types anywhere
- ✅ `redux-persist` only on auth slice
- ✅ Native fetch wrapper used everywhere - zero axios imports
- ✅ All thunks handle `pending` / `fulfilled` / `rejected`
- ✅ `AbortError` is re-thrown in thunks
- ✅ All list pages handle loading / error / empty states
- ✅ Protected pages redirect unauthenticated users
- ✅ Debounce fires only after 3+ characters with 400ms delay
- ✅ `typeof window !== 'undefined'` guard on all localStorage access
- ✅ Checkout form validates each step before progression

## 🎨 Key Implementation Patterns

### Debounced Search with AbortController
```typescript
const debouncedSearch = useDebounce(search, 400)

useEffect(() => {
  if (debouncedSearch.length > 0 && debouncedSearch.length < 3) return
  
  const controller = new AbortController()
  dispatch(fetchEvents({ 
    filters: { search: debouncedSearch },
    signal: controller.signal 
  }))
  
  return () => controller.abort()
}, [debouncedSearch])
```

### Protected Routes with HOC
```typescript
export function withAuth<P extends object>(Component: NextPage<P>) {
  const ProtectedPage: NextPage<P> = (props) => {
    const { isAuthenticated } = useAppSelector(state => state.auth)
    
    useEffect(() => {
      if (!isAuthenticated) {
        router.replace(`/login?returnUrl=${router.pathname}`)
      }
    }, [isAuthenticated])
    
    return isAuthenticated ? <Component {...props} /> : <Spinner />
  }
  return ProtectedPage
}
```

### SSR-Safe localStorage Access
```typescript
const token = typeof window !== 'undefined' 
  ? localStorage.getItem('token') 
  : null
```

## 🤖 AI Usage Disclosure

This project was developed with AI assistance (GitHub Copilot CLI) for:
- Boilerplate generation (type definitions, Redux slices)
- Component scaffolding and structure
- Best practices implementation
- Code consistency and patterns

All architectural decisions, implementation logic, and code quality standards were human-defined based on the project requirements.

## 📊 Project Statistics

- **12 Events** in mock database
- **4 Categories**: Concert, Theater, Sports, Conference
- **3 Cities**: Istanbul, Ankara, Izmir
- **15+ Components** organized by domain
- **5+ Custom Hooks** for reusable logic
- **3 Redux Slices** with full type safety
- **4 API Routes** with consistent response shapes
- **Zero TypeScript errors** in strict mode

## 🔮 Known Limitations & Future Improvements

### Current Limitations
1. Mock data only - no real database integration
2. No actual payment processing
3. Order history not persisted (in-memory only)
4. No email notifications
5. Limited seat map visualization

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

3. **Testing**
   - Unit tests with Jest + React Testing Library
   - E2E tests with Playwright
   - API integration tests

4. **Performance**
   - Image optimization with next/image
   - ISR (Incremental Static Regeneration) for events
   - CDN caching strategy

5. **User Experience**
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
