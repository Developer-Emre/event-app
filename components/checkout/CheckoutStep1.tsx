import type { SelectedSeat } from '@/types/checkout'
import Button from '@/components/ui/Button'

interface CheckoutStep1Props {
  eventTitle: string
  seats: SelectedSeat[]
  onNext: () => void
  onCancel: () => void
}

export default function CheckoutStep1({
  eventTitle,
  seats,
  onNext,
  onCancel,
}: CheckoutStep1Props) {
  const totalPrice = seats.reduce((sum, seat) => sum + seat.price, 0)

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Review Your Selection</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{eventTitle}</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Selected Seats:</h4>
          <div className="space-y-2">
            {seats.map((seat) => (
              <div key={seat.id} className="flex justify-between text-sm">
                <span>
                  Seat {seat.row}
                  {seat.number}
                </span>
                <span className="font-medium">
                  ₺{seat.price.toLocaleString('tr-TR')}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between font-bold">
            <span>Total ({seats.length} tickets):</span>
            <span>₺{totalPrice.toLocaleString('tr-TR')}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={onCancel} variant="outline" fullWidth>
          Cancel
        </Button>
        <Button onClick={onNext} fullWidth>
          Continue
        </Button>
      </div>
    </div>
  )
}
