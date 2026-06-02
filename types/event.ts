export interface Seat {
  id: string
  row: string
  number: number
  isAvailable: boolean
}

export interface Location {
  city: string
  district: string
  venue: string
  address: string
}

export interface Event {
  id: string
  slug: string
  title: string
  description: string
  date: string
  category: string
  imageUrl: string
  price: number
  location: Location
  seats: Seat[]
}

export interface EventFilters {
  search?: string
  category?: string
  city?: string
}
