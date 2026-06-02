import { VALIDATION_REGEX } from '@/constants/validation'

/**
 * Validate email address
 * @param email - Email to validate
 * @returns True if valid
 */
export function isValidEmail(email: string): boolean {
  return VALIDATION_REGEX.EMAIL.test(email)
}

/**
 * Validate phone number
 * @param phone - Phone number to validate
 * @returns True if valid (10-11 digits)
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\s/g, '')
  return VALIDATION_REGEX.PHONE.test(cleaned)
}

/**
 * Validate credit card number
 * @param cardNumber - Card number to validate
 * @returns True if valid (16 digits)
 */
export function isValidCardNumber(cardNumber: string): boolean {
  const cleaned = cardNumber.replace(/\s/g, '')
  return VALIDATION_REGEX.CARD_NUMBER.test(cleaned)
}

/**
 * Validate CVV
 * @param cvv - CVV to validate
 * @returns True if valid (3-4 digits)
 */
export function isValidCVV(cvv: string): boolean {
  return VALIDATION_REGEX.CVV.test(cvv)
}

/**
 * Validate expiry date (MM/YY format)
 * @param expiry - Expiry date to validate
 * @returns True if valid format and future date
 */
export function isValidExpiry(expiry: string): boolean {
  if (!VALIDATION_REGEX.EXPIRY.test(expiry)) {
    return false
  }

  const [month, year] = expiry.split('/').map(Number)
  const now = new Date()
  const currentYear = now.getFullYear() % 100 // Get last 2 digits
  const currentMonth = now.getMonth() + 1

  // Check if date is in the future
  if (year < currentYear) return false
  if (year === currentYear && month < currentMonth) return false

  return true
}

/**
 * Check if string is not empty
 * @param value - Value to check
 * @returns True if not empty
 */
export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0
}

/**
 * Check if value meets minimum length
 * @param value - Value to check
 * @param minLength - Minimum length
 * @returns True if meets minimum
 */
export function meetsMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength
}
