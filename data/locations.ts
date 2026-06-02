import { getCities, getDistrictsByCityCode } from 'turkey-neighbourhoods'
import type { City, District } from '@/types/location'

// Get all 81 Turkish cities from the library
const turkishCities = getCities()

// Transform library data to match our City interface
export const cities: City[] = turkishCities.map((city) => ({
  id: city.code,
  name: city.name,
}))

// Generate all districts for all cities
export const districts: District[] = cities.flatMap((city) => {
  const cityDistricts = getDistrictsByCityCode(city.id)
  return cityDistricts.map((districtName, index) => ({
    id: `${city.id}${String(index + 1).padStart(2, '0')}`, // e.g., "3401", "3402"
    name: districtName,
    cityId: city.id,
  }))
})
