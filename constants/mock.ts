// Mock data constants for testing

export const MOCK_USERS = [
  {
    id: '1',
    email: 'test@test.com',
    password: 'password123',
    name: 'Test User',
  },
  {
    id: '2',
    email: 'admin@test.com',
    password: 'admin123',
    name: 'Admin User',
  },
] as const

export const MOCK_TOKEN = 'mock-jwt-token-12345'

// Mock credit cards for testing
export const MOCK_CARDS = {
  VISA: '4111111111111111',
  MASTERCARD: '5555555555554444',
  AMEX: '378282246310005',
} as const
