// Application-wide constants

export const APP_NAME = 'Event Ticketing App'
export const APP_DESCRIPTION = 'Find and book tickets for concerts, sports, theater, and conferences'

// Locale
export const DEFAULT_LOCALE = 'tr-TR'
export const DEFAULT_CURRENCY = 'TRY'
export const CURRENCY_SYMBOL = '₺'

// Pagination
export const EVENTS_PER_PAGE = 12
export const ORDERS_PER_PAGE = 10

// Search
export const SEARCH_DEBOUNCE_MS = 400
export const SEARCH_MIN_CHARS = 3

// Auth
export const TOKEN_STORAGE_KEY = 'token'
export const USER_STORAGE_KEY = 'user'

// LocalStorage keys
export const STORAGE_KEYS = {
  FILTER_CITY: 'filterCity',
  SELECTED_CITY: 'selectedCity',
  REDUX_PERSIST_AUTH: 'persist:auth',
  REDUX_PERSIST_ORDERS: 'persist:orders',
} as const

// API Routes
export const API_ROUTES = {
  EVENTS: '/api/events',
  EVENT_BY_SLUG: (slug: string) => `/api/events/${slug}`,
  LOGIN: '/api/auth/login',
  CHECKOUT: '/api/checkout',
} as const

// Page Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PROFILE: '/profile',
  ORDERS: '/profile/orders',
  CHECKOUT: '/checkout',
  EVENT: (slug: string) => `/event/${slug}`,
} as const
