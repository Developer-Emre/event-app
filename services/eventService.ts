import apiFetch from './api'
import type { Event, EventFilters } from '@/types/event'
import type { ApiSuccessResponse } from '@/types/api'

export async function getEvents(
  filters?: EventFilters,
  signal?: AbortSignal
): Promise<Event[]> {
  const params = new URLSearchParams()
  if (filters?.search) params.append('search', filters.search)
  if (filters?.category) params.append('category', filters.category)
  if (filters?.city) params.append('city', filters.city)

  const queryString = params.toString()
  const path = `/events${queryString ? `?${queryString}` : ''}`

  const response = await apiFetch<ApiSuccessResponse<Event[]>>(path, { signal })
  return response.data
}

export async function getEventBySlug(
  slug: string,
  signal?: AbortSignal
): Promise<Event> {
  const response = await apiFetch<ApiSuccessResponse<Event>>(
    `/events/${slug}`,
    { signal }
  )
  return response.data
}
