import { DEFAULT_LOCALE, CURRENCY_SYMBOL } from '@/constants/app'

/**
 * Format currency amount
 * @param amount - The amount to format
 * @param locale - Locale string (default: 'tr-TR')
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, locale: string = DEFAULT_LOCALE): string {
  return `${CURRENCY_SYMBOL}${amount.toLocaleString(locale)}`
}

/**
 * Format date to localized string
 * @param date - Date string or Date object
 * @param locale - Locale string (default: 'tr-TR')
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: string | Date,
  locale: string = DEFAULT_LOCALE,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  
  return dateObj.toLocaleDateString(locale, options || defaultOptions)
}

/**
 * Format date and time to localized string
 * @param date - Date string or Date object
 * @param locale - Locale string (default: 'tr-TR')
 * @returns Formatted date and time string
 */
export function formatDateTime(
  date: string | Date,
  locale: string = DEFAULT_LOCALE
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Format phone number with spaces
 * @param phone - Phone number string
 * @returns Formatted phone number
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4')
  }
  
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4')
  }
  
  return phone
}

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}
