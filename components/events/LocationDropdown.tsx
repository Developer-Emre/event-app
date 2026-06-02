import { useState, useEffect } from 'react'
import { cities, districts } from '@/data/locations'
import type { LocationData } from '@/types/location'

interface LocationDropdownProps {
  onChange?: (location: LocationData) => void
}

export default function LocationDropdown({ onChange }: LocationDropdownProps) {
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')

  // Filter districts based on selected city
  const filteredDistricts = selectedCity
    ? districts.filter((district) => district.cityId === selectedCity)
    : []

  // Handle city change - reset district
  const handleCityChange = (cityId: string) => {
    setSelectedCity(cityId)
    setSelectedDistrict('')
  }

  // Notify parent component of changes
  useEffect(() => {
    if (onChange) {
      onChange({
        city: selectedCity,
        district: selectedDistrict,
      })
    }
  }, [selectedCity, selectedDistrict, onChange])

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          City <span className="text-red-500">*</span>
        </label>
        <select
          id="city"
          value={selectedCity}
          onChange={(e) => handleCityChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="district"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          District <span className="text-red-500">*</span>
        </label>
        <select
          id="district"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          disabled={!selectedCity}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">
            {selectedCity ? 'Select a district' : 'Select a city first'}
          </option>
          {filteredDistricts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}