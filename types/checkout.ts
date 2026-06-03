export interface SelectedSeat {
  id: string
  row: string
  number: number
  price: number
}

export interface PersonalInfo {
  name: string
  email: string
  phone: string
  city: string
  district: string
  street: string
  address: string
}

export interface PaymentInfo {
  cardNumber: string
  expiry: string
  cvv: string
}

export interface CheckoutData {
  eventId: string
  eventTitle: string
  seats: SelectedSeat[]
  personalInfo: PersonalInfo | null
  paymentInfo: PaymentInfo | null
  currentStep: number
}

export interface Order {
  id: string
  eventId: string
  eventTitle: string
  seats: SelectedSeat[]
  totalPrice: number
  personalInfo: PersonalInfo
  createdAt: string
}
