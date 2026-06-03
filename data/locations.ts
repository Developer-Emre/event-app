import { getCities, getDistrictsByCityCode, getDistrictsAndNeighbourhoodsByCityCode } from 'turkey-neighbourhoods'
import type { City, District, Street } from '@/types/location'

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

// Generate all streets (neighbourhoods/mahalle) for all cities
export const streets: Street[] = cities.flatMap((city) => {
  const cityData = getDistrictsAndNeighbourhoodsByCityCode(city.id)
  
  return Object.entries(cityData).flatMap(([districtName, neighbourhoodList]) => {
    // Find the district ID
    const district = districts.find(
      (d) => d.name === districtName && d.cityId === city.id
    )
    
    if (!district) return []
    
    return neighbourhoodList.map((neighbourhoodName, index) => ({
      id: `${district.id}${String(index + 1).padStart(3, '0')}`, // e.g., "3401001", "3401002"
      name: neighbourhoodName,
      districtId: district.id,
      cityId: city.id,
    }))
  })
})
