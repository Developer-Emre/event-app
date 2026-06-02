import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import type { Event } from '@/types/event'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useDebounce } from '@/hooks/useDebounce'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { fetchEvents } from '@/store/eventSlice'
import EventList from '@/components/events/EventList'
import EventFilter from '@/components/events/EventFilter'
import Spinner from '@/components/ui/Spinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import EmptyState from '@/components/ui/EmptyState'

const HomePage: NextPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { items, isLoading, error } = useAppSelector((state) => state.events)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [city, setCity] = useLocalStorage('filterCity', '')

  const debouncedSearch = useDebounce(search, 400)

  // Sync category from URL
  useEffect(() => {
    if (router.query.category) {
      setCategory(router.query.category as string)
    }
  }, [router.query.category])

  // Fetch events - memoized to prevent unnecessary re-renders
  useEffect(() => {
    // Skip if search is between 1-2 characters
    if (debouncedSearch.length > 0 && debouncedSearch.length < 3) {
      return
    }

    const controller = new AbortController()
    let isActive = true

    const loadEvents = async () => {
      try {
        await dispatch(
          fetchEvents({
            filters: {
              search: debouncedSearch || undefined,
              category: category || undefined,
              city: city || undefined,
            },
            signal: controller.signal,
          })
        ).unwrap()
      } catch (err: any) {
        if (err?.name !== 'AbortError' && isActive) {
          console.error('Failed to fetch events:', err)
        }
      }
    }

    loadEvents()

    return () => {
      isActive = false
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, category, city])

  const handleCategoryChange = useCallback((newCategory: string) => {
    setCategory(newCategory)
    router.push(
      {
        pathname: router.pathname,
        query: newCategory ? { category: newCategory } : {},
      },
      undefined,
      { shallow: true }
    )
  }, [router])

  const handleRetry = useCallback(() => {
    dispatch(fetchEvents({ filters: {} }))
  }, [dispatch])

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Discover Amazing Events
          </h1>
          <p className="text-gray-600">
            Find and book tickets for concerts, sports, theater, and conferences across Turkey
          </p>
        </div>

        <EventFilter
          search={search}
          category={category}
          city={city}
          onSearchChange={setSearch}
          onCategoryChange={handleCategoryChange}
          onCityChange={setCity}
        />

        {isLoading && <Spinner />}

        {error && <ErrorMessage message={error} onRetry={handleRetry} />}

        {!isLoading && !error && items.length === 0 && (
          <EmptyState message="No events found. Try adjusting your filters." />
        )}

        {!isLoading && !error && items.length > 0 && <EventList events={items} />}
      </div>
    </div>
  )
}

export default HomePage
