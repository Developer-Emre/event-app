export interface City {
  id: string
  name: string
}

export interface District {
  id: string
  name: string
  cityId: string
}

export interface LocationData {
  city: string
  district: string
}
