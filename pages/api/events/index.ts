import type { NextApiRequest, NextApiResponse } from 'next'
import type { Event } from '@/types/event'
import events from '@/data/events.json'

type ResponseData = { data: Event[] } | { error: string }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { search, category, city } = req.query

    let filteredEvents = [...events] as Event[]

    if (search && typeof search === 'string') {
      const searchLower = search.toLowerCase()
      filteredEvents = filteredEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower)
      )
    }

    if (category && typeof category === 'string') {
      filteredEvents = filteredEvents.filter(
        (event) => event.category === category
      )
    }

    if (city && typeof city === 'string') {
      filteredEvents = filteredEvents.filter(
        (event) => event.location.city === city
      )
    }

    return res.status(200).json({ data: filteredEvents })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
