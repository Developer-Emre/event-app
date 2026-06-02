import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { CheckoutData, SelectedSeat, PersonalInfo, PaymentInfo, Order } from '@/types/checkout'
import * as checkoutService from '@/services/checkoutService'

interface CheckoutState extends CheckoutData {
  isLoading: boolean
  error: string | null
  order: Order | null
}

const initialState: CheckoutState = {
  eventId: '',
  eventTitle: '',
  seats: [],
  personalInfo: null,
  paymentInfo: null,
  currentStep: 1,
  isLoading: false,
  error: null,
  order: null,
}

export const submitOrder = createAsyncThunk(
  'checkout/submit',
  async (data: CheckoutData, { rejectWithValue }) => {
    try {
      return await checkoutService.submitCheckout(data)
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message)
      }
      return rejectWithValue('Checkout failed')
    }
  }
)

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    initCheckout: (state, action: PayloadAction<{ eventId: string; eventTitle: string; seats: SelectedSeat[] }>) => {
      state.eventId = action.payload.eventId
      state.eventTitle = action.payload.eventTitle
      state.seats = action.payload.seats
      state.currentStep = 1
      state.personalInfo = null
      state.paymentInfo = null
      state.error = null
      state.order = null
    },
    setPersonalInfo: (state, action: PayloadAction<PersonalInfo>) => {
      state.personalInfo = action.payload
    },
    setPaymentInfo: (state, action: PayloadAction<PaymentInfo>) => {
      state.paymentInfo = action.payload
    },
    nextStep: (state) => {
      if (state.currentStep < 3) {
        state.currentStep += 1
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1
      }
    },
    resetCheckout: () => initialState,
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(submitOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.isLoading = false
        state.order = action.payload
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const {
  initCheckout,
  setPersonalInfo,
  setPaymentInfo,
  nextStep,
  prevStep,
  resetCheckout,
  clearError,
} = checkoutSlice.actions
export default checkoutSlice.reducer
