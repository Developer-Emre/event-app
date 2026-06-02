import { useState, FormEvent } from 'react'
import type { PaymentInfo } from '@/types/checkout'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

interface CheckoutStep3Props {
  initialData: PaymentInfo | null
  isLoading: boolean
  onSubmit: (data: PaymentInfo) => void
  onBack: () => void
}

export default function CheckoutStep3({
  initialData,
  isLoading,
  onSubmit,
  onBack,
}: CheckoutStep3Props) {
  const [formData, setFormData] = useState<PaymentInfo>(
    initialData || {
      cardNumber: '',
      expiry: '',
      cvv: '',
    }
  )

  const [errors, setErrors] = useState<Partial<PaymentInfo>>({})

  const validate = () => {
    const newErrors: Partial<PaymentInfo> = {}

    const cardNumberClean = formData.cardNumber.replace(/\s/g, '')
    if (!cardNumberClean) {
      newErrors.cardNumber = 'Card number is required'
    } else if (!/^[0-9]{16}$/.test(cardNumberClean)) {
      newErrors.cardNumber = 'Card number must be 16 digits'
    }

    if (!formData.expiry) {
      newErrors.expiry = 'Expiry date is required'
    } else if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(formData.expiry)) {
      newErrors.expiry = 'Expiry must be in MM/YY format'
    }

    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required'
    } else if (!/^[0-9]{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3-4 digits'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '')
    const chunks = cleaned.match(/.{1,4}/g) || []
    return chunks.join(' ')
  }

  const handleCardNumberChange = (value: string) => {
    const cleaned = value.replace(/\s/g, '')
    if (/^[0-9]*$/.test(cleaned) && cleaned.length <= 16) {
      setFormData({ ...formData, cardNumber: cleaned })
    }
  }

  const handleExpiryChange = (value: string) => {
    let cleaned = value.replace(/\D/g, '')
    if (cleaned.length >= 2) {
      cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4)
    }
    if (cleaned.length <= 5) {
      setFormData({ ...formData, expiry: cleaned })
    }
  }

  const handleCvvChange = (value: string) => {
    if (/^[0-9]*$/.test(value) && value.length <= 4) {
      setFormData({ ...formData, cvv: value })
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Payment Information</h2>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Test Mode:</strong> Use any 16-digit card number for testing.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Card Number"
          type="text"
          value={formatCardNumber(formData.cardNumber)}
          onChange={(e) => handleCardNumberChange(e.target.value)}
          error={errors.cardNumber}
          placeholder="1234 5678 9012 3456"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Expiry Date"
            type="text"
            value={formData.expiry}
            onChange={(e) => handleExpiryChange(e.target.value)}
            error={errors.expiry}
            placeholder="MM/YY"
          />

          <Input
            label="CVV"
            type="text"
            value={formData.cvv}
            onChange={(e) => handleCvvChange(e.target.value)}
            error={errors.cvv}
            placeholder="123"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            fullWidth
            disabled={isLoading}
          >
            Back
          </Button>
          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Complete Purchase'}
          </Button>
        </div>
      </form>
    </div>
  )
}
