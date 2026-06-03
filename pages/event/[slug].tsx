import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
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
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const totalPrice = selectedSeats.length * event.price
  const availableSeats = event.seats.filter((s) => s.isAvailable).length

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
    <div className="bg-gradient-to-br from-orange-50 via-white to-amber-50 min-h-screen">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-500 pt-8 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-white/90 hover:text-white mb-6 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
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
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Event Image */}
              <div className="relative h-80 bg-gray-100">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <Badge variant="orange">{event.category}</Badge>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                  {event.title}
                </h1>

                {/* Date & Time */}
                <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-xl mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
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
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Date & Time</p>
                    <p className="text-lg font-semibold text-gray-900">{formattedDate}</p>
                    <p className="text-gray-700">{formattedTime}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4 p-4 bg-orange-50 border border-orange-100 rounded-xl mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
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
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Venue</p>
                    <p className="text-lg font-semibold text-gray-900">{event.location.venue}</p>
                    <p className="text-gray-700">{event.location.district}, {event.location.city}</p>
                    <p className="text-sm text-gray-600 mt-1">{event.location.address}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="pt-6 border-t border-gray-200">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">About This Event</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Seat Selector */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Select Your Seats</h2>
              <SeatSelector seats={event.seats} onSeatsSelect={setSelectedSeats} />
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <div className="text-center pb-6 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-600 mb-2">Ticket Price</p>
                <p className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                  ₺{event.price.toLocaleString()}
                </p>
              </div>

              {selectedSeats.length > 0 && (
                <div className="my-6 p-5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-gray-900">
                      {selectedSeats.length} Ticket{selectedSeats.length > 1 ? 's' : ''}
                    </span>
                    <span className="text-2xl font-bold text-orange-600">
                      ₺{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedSeats.map((s) => (
                      <span
                        key={s.id}
                        className="px-3 py-1 bg-white rounded-lg text-sm font-medium text-gray-700 shadow-sm"
                      >
                        {s.row}{s.number}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={handleBuyTicket}
                disabled={selectedSeats.length === 0}
                fullWidth
                size="lg"
                className="mb-6"
              >
                {selectedSeats.length === 0 ? 'Select Seats' : 'Continue to Checkout'}
              </Button>

              <div className="space-y-3 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Available Seats</span>
                  <span className="font-semibold text-gray-900">{availableSeats}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Secure Booking</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Instant Confirmation</span>
                </div>
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
