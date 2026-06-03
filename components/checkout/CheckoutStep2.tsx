import { useState, FormEvent, useCallback } from 'react'
import type { PersonalInfo } from '@/types/checkout'
import type { LocationData } from '@/types/location'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import LocationDropdown from '@/components/events/LocationDropdown'
import { cities, districts, streets } from '@/data/locations'

interface CheckoutStep2Props {
  initialData: PersonalInfo | null
  onNext: (data: PersonalInfo) => void
  onBack: () => void
}

export default function CheckoutStep2({ initialData, onNext, onBack }: CheckoutStep2Props) {
  const [formData, setFormData] = useState<PersonalInfo>(
    initialData || {
      name: '',
      email: '',
      phone: '',
      city: '',
      district: '',
      street: '',
      address: '',
    }
  )

  const [errors, setErrors] = useState<Partial<Record<keyof PersonalInfo, string>>>({})

  const handleLocationChange = useCallback((location: LocationData) => {
    // Get display names from IDs
    const cityName = cities.find((c) => c.id === location.city)?.name || ''
    const districtName = districts.find((d) => d.id === location.district)?.name || ''
    const streetName = streets.find((s) => s.id === location.street)?.name || ''

    setFormData((prev) => ({
      ...prev,
      city: cityName,
      district: districtName,
      street: streetName,
    }))
  }, [])

  const validate = () => {
    const newErrors: Partial<Record<keyof PersonalInfo, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    // Phone is optional, but validate format if provided
    if (formData.phone.trim() && !/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone must be 10-11 digits'
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }

    if (!formData.district.trim()) {
      newErrors.district = 'District is required'
    }

    if (!formData.street.trim()) {
      newErrors.street = 'Street is required'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onNext(formData)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Personal & Address Information</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
          
          <Input
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            placeholder="John Doe"
            required
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            placeholder="john@example.com"
            required
          />

          <Input
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={errors.phone}
            placeholder="5551234567 (optional)"
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Delivery Address</h3>
          
          <LocationDropdown onChange={handleLocationChange} />

          {errors.city && (
            <p className="text-sm text-red-600">{errors.city}</p>
          )}
          {errors.district && (
            <p className="text-sm text-red-600">{errors.district}</p>
          )}
          {errors.street && (
            <p className="text-sm text-red-600">{errors.street}</p>
          )}

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter your street name, building number, apartment number, floor, etc."
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="button" onClick={onBack} variant="outline" fullWidth>
            Back
          </Button>
          <Button type="submit" fullWidth>
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  )
}
