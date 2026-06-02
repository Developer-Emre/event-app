import type { NextApiRequest, NextApiResponse } from 'next'
import type { Order } from '@/types/checkout'

type ResponseData = { data: Order } | { error: string }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { eventId, eventTitle, seats, personalInfo, paymentInfo } = req.body

    if (!eventId || !seats || !personalInfo || !paymentInfo) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    if (seats.length === 0) {
      return res.status(400).json({ error: 'No seats selected' })
    }

    const totalPrice = seats.reduce(
      (sum: number, seat: { price: number }) => sum + seat.price,
      0
    )

    const order: Order = {
      id: 'order-' + Date.now(),
      eventId,
      eventTitle,
      seats,
      totalPrice,
      personalInfo,
      createdAt: new Date().toISOString(),
    }

    return res.status(200).json({ data: order })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
