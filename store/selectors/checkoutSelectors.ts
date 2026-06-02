import type { RootState } from '@/store'

// Checkout selectors
export const selectCheckout = (state: RootState) => state.checkout
export const selectCheckoutEventId = (state: RootState) => state.checkout.eventId
export const selectCheckoutEventTitle = (state: RootState) => state.checkout.eventTitle
export const selectCheckoutSeats = (state: RootState) => state.checkout.seats
export const selectCheckoutPersonalInfo = (state: RootState) => state.checkout.personalInfo
export const selectCheckoutPaymentInfo = (state: RootState) => state.checkout.paymentInfo
export const selectCheckoutCurrentStep = (state: RootState) => state.checkout.currentStep

// Computed selectors
export const selectCheckoutTotalPrice = (state: RootState) =>
  state.checkout.seats.reduce((total, seat) => total + seat.price, 0)

export const selectCheckoutSeatCount = (state: RootState) => state.checkout.seats.length

export const selectCheckoutIsComplete = (state: RootState) =>
  state.checkout.personalInfo !== null &&
  state.checkout.paymentInfo !== null &&
  state.checkout.seats.length > 0
