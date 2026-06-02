/**
 * Enhanced fetch wrapper with better error handling and typing
 */

export interface FetchOptions extends RequestInit {
  token?: string
  timeout?: number
}

export class FetchError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message: string
  ) {
    super(message)
    this.name = 'FetchError'
  }
}

/**
 * Enhanced fetch with timeout and auth support
 * @param url - URL to fetch
 * @param options - Fetch options
 * @returns Promise with typed response
 */
export async function fetchWithTimeout<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, timeout = 10000, ...fetchOptions } = options

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    // Add custom headers
    if (fetchOptions.headers) {
      Object.entries(fetchOptions.headers).forEach(([key, value]) => {
        headers[key] = String(value)
      })
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}))
      throw new FetchError(
        response.status,
        response.statusText,
        errorBody.error || `HTTP ${response.status}`
      )
    }

    return response.json() as Promise<T>
  } catch (error) {
    clearTimeout(timeoutId)
    
    if (error instanceof Error && error.name === 'AbortError') {
      throw new FetchError(408, 'Request Timeout', 'Request timed out')
    }
    
    throw error
  }
}
