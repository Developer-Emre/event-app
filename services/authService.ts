import apiFetch from './api'
import type { LoginCredentials, AuthResponse } from '@/types/auth'
import type { ApiSuccessResponse } from '@/types/api'

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await apiFetch<ApiSuccessResponse<AuthResponse>>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
  return response.data
}

export async function logout(): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token')
  }
}
