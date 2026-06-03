import type { Event } from '@/types/event'
import EventCard from './EventCard'

interface EventListProps {
  events: Event[]
}

export default function EventList({ events }: EventListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => (
        <EventCard 
          key={event.id} 
          event={event} 
          priority={index < 3}
        />
      ))}
    </div>
  )
}
