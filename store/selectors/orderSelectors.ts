import type { RootState } from '@/store'
import type { Order } from '@/types/checkout'

// Order selectors
export const selectOrders = (state: RootState) => state.orders.orders
export const selectOrdersCount = (state: RootState) => state.orders.orders.length

// Computed selectors
export const selectOrderById = (orderId: string) => (state: RootState): Order | undefined =>
  state.orders.orders.find((order) => order.id === orderId)

export const selectOrdersByEventId = (eventId: string) => (state: RootState): Order[] =>
  state.orders.orders.filter((order) => order.eventId === eventId)

export const selectTotalSpent = (state: RootState): number =>
  state.orders.orders.reduce((total, order) => total + order.totalPrice, 0)

