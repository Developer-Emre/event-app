import apiFetch from './api'
import type { Order, CheckoutData } from '@/types/checkout'
import type { ApiSuccessResponse } from '@/types/api'

export async function submitCheckout(data: CheckoutData): Promise<Order> {
  const response = await apiFetch<ApiSuccessResponse<Order>>('/checkout', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return response.data
}
