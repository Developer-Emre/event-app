import type { NextApiRequest, NextApiResponse } from 'next'
import type { Event } from '@/types/event'
import events from '@/data/events.json'

type ResponseData = { data: Event } | { error: string }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { slug } = req.query

    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({ error: 'Invalid slug' })
    }

    const event = (events as Event[]).find((e) => e.slug === slug)

    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }

    return res.status(200).json({ data: event })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
