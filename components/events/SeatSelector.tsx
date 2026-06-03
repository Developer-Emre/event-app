import { useState } from 'react'
import type { Seat } from '@/types/event'

interface SeatSelectorProps {
  seats: Seat[]
  onSeatsSelect: (selectedSeats: Seat[]) => void
}

export default function SeatSelector({ seats, onSeatsSelect }: SeatSelectorProps) {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])

  const handleSeatClick = (seat: Seat) => {
    if (!seat.isAvailable) return

    const isSelected = selectedSeats.some((s) => s.id === seat.id)
    
    let newSelection: Seat[]
    if (isSelected) {
      newSelection = selectedSeats.filter((s) => s.id !== seat.id)
    } else {
      newSelection = [...selectedSeats, seat]
    }
    
    setSelectedSeats(newSelection)
    onSeatsSelect(newSelection)
  }

  const rows = Array.from(new Set(seats.map((s) => s.row))).sort()

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Select Your Seats</h3>
      
      <div className="mb-6">
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
            <span>Unavailable</span>
          </div>
        </div>
      </div>

      <div className="mb-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-center py-3 rounded-lg font-bold shadow-lg">
        STAGE
      </div>

      <div className="space-y-3">
        {rows.map((row) => {
          const rowSeats = seats.filter((s) => s.row === row).sort((a, b) => a.number - b.number)
          return (
            <div key={row} className="flex items-center gap-2">
              <div className="w-8 text-center font-semibold">{row}</div>
              <div className="flex gap-2 flex-wrap">
                {rowSeats.map((seat) => {
                  const isSelected = selectedSeats.some((s) => s.id === seat.id)
                  return (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat)}
                      disabled={!seat.isAvailable}
                      className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                        !seat.isAvailable
                          ? 'bg-gray-300 cursor-not-allowed'
                          : isSelected
                          ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-md'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                      title={`Seat ${seat.row}${seat.number}`}
                    >
                      {seat.number}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {selectedSeats.length > 0 && (
        <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h4 className="font-semibold text-orange-900 mb-2">Selected Seats:</h4>
          <p className="text-sm text-orange-800">
            {selectedSeats.map((s) => `${s.row}${s.number}`).join(', ')}
          </p>
          <p className="text-sm font-semibold mt-2 text-orange-900">
            Total: {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  )
}
