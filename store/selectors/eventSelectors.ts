import type { RootState } from '@/store'

// Event selectors
export const selectEvents = (state: RootState) => state.events
export const selectEventItems = (state: RootState) => state.events.items
export const selectSelectedEvent = (state: RootState) => state.events.selected
export const selectEventsLoading = (state: RootState) => state.events.isLoading
export const selectEventsError = (state: RootState) => state.events.error

// Computed selectors
export const selectEventBySlug = (slug: string) => (state: RootState) =>
  state.events.items.find((event) => event.slug === slug)

export const selectEventsByCategory = (category: string) => (state: RootState) =>
  state.events.items.filter((event) => event.category === category)

export const selectEventsCount = (state: RootState) => state.events.items.length
