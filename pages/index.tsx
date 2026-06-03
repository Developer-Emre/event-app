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

  // Fetch events
  useEffect(() => {
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
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError' && isActive) {
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
    <div className=" min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Discover Amazing Events
            </h1>
            <p className="text-lg text-orange-100 max-w-2xl mx-auto">
              Find and book tickets for the best concerts, sports, theater shows, and conferences
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
