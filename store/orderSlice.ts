import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Order } from '@/types/checkout'

interface OrderState {
  orders: Order[]
}

const initialState: OrderState = {
  orders: [],
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload) // Add to beginning (newest first)
    },
    clearOrders: (state) => {
      state.orders = []
    },
  },
})

export const { addOrder, clearOrders } = orderSlice.actions
export default orderSlice.reducer
