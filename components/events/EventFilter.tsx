import { ChangeEvent } from 'react'
import Input from '@/components/ui/Input'

interface EventFilterProps {
  search: string
  category: string
  city: string
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onCityChange: (value: string) => void
}

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'concert', label: 'Concert' },
  { value: 'theater', label: 'Theater' },
  { value: 'sports', label: 'Sports' },
  { value: 'conference', label: 'Conference' },
]

const cities = [
  { value: '', label: 'All Cities' },
  { value: 'Istanbul', label: 'Istanbul' },
  { value: 'Ankara', label: 'Ankara' },
  { value: 'Izmir', label: 'Izmir' },
]

export default function EventFilter({
  search,
  category,
  city,
  onSearchChange,
  onCategoryChange,
  onCityChange,
}: EventFilterProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Filter Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Search"
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <select
            value={city}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => onCityChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
          >
            {cities.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
