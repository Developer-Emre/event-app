// Validation constants and regex patterns

export const VALIDATION_REGEX = {
  EMAIL: /\S+@\S+\.\S+/,
  PHONE: /^[0-9]{10,11}$/,
  CARD_NUMBER: /^[0-9]{16}$/,
  CVV: /^[0-9]{3,4}$/,
  EXPIRY: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
} as const

export const VALIDATION_MESSAGES = {
  REQUIRED: (field: string) => `${field} is required`,
  INVALID: (field: string) => `${field} is invalid`,
  EMAIL: 'Email is invalid',
  PHONE: 'Phone must be 10-11 digits',
  CARD_NUMBER: 'Card number must be 16 digits',
  CVV: 'CVV must be 3-4 digits',
  EXPIRY: 'Expiry must be in MM/YY format',
  MIN_LENGTH: (field: string, min: number) => `${field} must be at least ${min} characters`,
} as const

export const FIELD_LENGTHS = {
  PHONE_MIN: 10,
  PHONE_MAX: 11,
  CARD_NUMBER: 16,
  CVV_MIN: 3,
  CVV_MAX: 4,
} as const
