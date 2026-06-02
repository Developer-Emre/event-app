import Image from 'next/image'
import Link from 'next/link'
import type { Event } from '@/types/event'
import Badge from '@/components/ui/Badge'

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const formattedTime = eventDate.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const categoryVariant = {
    concert: 'info' as const,
    theater: 'warning' as const,
    sports: 'success' as const,
    conference: 'danger' as const,
  }

  return (
    <Link href={`/event/${event.slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
        <div className="relative h-48 w-full bg-gray-200">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <svg
              className="w-16 h-16"
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
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
              {event.title}
            </h3>
            <Badge variant={categoryVariant[event.category as keyof typeof categoryVariant] || 'default'}>
              {event.category}
            </Badge>
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {event.description}
          </p>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <svg
                className="w-4 h-4 mr-2"
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
              {formattedDate} - {formattedTime}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg
                className="w-4 h-4 mr-2"
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
              {event.location.city} - {event.location.venue}
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xl font-bold text-blue-600">
                ₺{event.price.toLocaleString('tr-TR')}
              </span>
              <span className="text-sm text-gray-500">
                {event.seats.filter((s) => s.isAvailable).length} seats available
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
