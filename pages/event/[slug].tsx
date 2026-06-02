import { useState } from 'react'
import { useRouter } from 'next/router'
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import type { Event, Seat } from '@/types/event'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { initCheckout } from '@/store/checkoutSlice'
import events from '@/data/events.json'
import SeatSelector from '@/components/events/SeatSelector'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

interface EventDetailPageProps {
  event: Event
}

const EventDetailPage: NextPage<EventDetailPageProps> = ({ event }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])

  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const formattedTime = eventDate.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const totalPrice = selectedSeats.length * event.price

  const handleBuyTicket = () => {
    if (selectedSeats.length === 0) return

    dispatch(
      initCheckout({
        eventId: event.id,
        eventTitle: event.title,
        seats: selectedSeats.map((seat) => ({
          id: seat.id,
          row: seat.row,
          number: seat.number,
          price: event.price,
        })),
      })
    )

    router.push('/checkout')
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Events
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="h-96 bg-gray-200 flex items-center justify-center">
                <svg
                  className="w-32 h-32 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-900 flex-1">
                    {event.title}
                  </h1>
                  <Badge>{event.category}</Badge>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-700">
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>
                      {formattedDate} at {formattedTime}
                    </span>
                  </div>

                  <div className="flex items-start text-gray-700">
                    <svg
                      className="w-5 h-5 mr-3 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold">{event.location.venue}</p>
                      <p className="text-sm">
                        {event.location.district}, {event.location.city}
                      </p>
                      <p className="text-sm text-gray-600">
                        {event.location.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-xl font-semibold mb-3">About This Event</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>

            <SeatSelector seats={event.seats} onSeatsSelect={setSelectedSeats} />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 mb-2">Price per ticket</p>
                <p className="text-4xl font-bold text-blue-600">
                  ₺{event.price.toLocaleString('tr-TR')}
                </p>
              </div>

              {selectedSeats.length > 0 && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">
                      {selectedSeats.length} ticket{selectedSeats.length > 1 ? 's' : ''}
                    </span>
                    <span className="font-semibold">
                      ₺{totalPrice.toLocaleString('tr-TR')}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Seats: {selectedSeats.map((s) => `${s.row}${s.number}`).join(', ')}
                  </div>
                </div>
              )}

              <Button
                onClick={handleBuyTicket}
                disabled={selectedSeats.length === 0}
                fullWidth
                size="lg"
              >
                {selectedSeats.length === 0 ? 'Select Seats' : 'Buy Tickets'}
              </Button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>
                    {event.seats.filter((s) => s.isAvailable).length}
                  </strong>{' '}
                  seats available
                </p>
                <p className="text-sm text-gray-600">
                  Secure booking • Instant confirmation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (events as Event[]).map((event) => ({
    params: { slug: event.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<EventDetailPageProps> = async ({
  params,
}) => {
  const event = (events as Event[]).find((e) => e.slug === params?.slug)

  if (!event) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      event,
    },
  }
}

export default EventDetailPage