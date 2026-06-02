import authReducer, { loginUser, logout, clearError } from '@/store/authSlice'
import type { AuthResponse } from '@/types/auth'

interface AuthState {
  user: { id: string; name: string; email: string } | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

describe('authSlice', () => {
  const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  }

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  describe('logout', () => {
    it('should clear user data and reset state', () => {
      const previousState = {
        user: { id: '1', name: 'Test User', email: 'test@test.com' },
        token: 'mock-token',
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }

      expect(authReducer(previousState, logout())).toEqual(initialState)
    })
  })

  describe('clearError', () => {
    it('should clear error message', () => {
      const previousState = {
        ...initialState,
        error: 'Login failed',
      }

      expect(authReducer(previousState, clearError())).toEqual({
        ...previousState,
        error: null,
      })
    })
  })

  describe('loginUser async thunk', () => {
    it('should set loading state when pending', () => {
      const action = { type: loginUser.pending.type }
      const state = authReducer(initialState, action)

      expect(state.isLoading).toBe(true)
      expect(state.error).toBe(null)
    })

    it('should set user and token when fulfilled', () => {
      const mockResponse: AuthResponse = {
        user: {
          id: '1',
          name: 'Test User',
          email: 'test@test.com',
        },
        token: 'mock-jwt-token',
      }

      const action = {
        type: loginUser.fulfilled.type,
        payload: mockResponse,
      }
      const state = authReducer(initialState, action)

      expect(state.isLoading).toBe(false)
      expect(state.isAuthenticated).toBe(true)
      expect(state.user).toEqual(mockResponse.user)
      expect(state.token).toBe(mockResponse.token)
      expect(state.error).toBe(null)
    })

    it('should set error when rejected', () => {
      const errorMessage = 'Invalid credentials'
      const action = {
        type: loginUser.rejected.type,
        payload: errorMessage,
      }
      const state = authReducer(initialState, action)

      expect(state.isLoading).toBe(false)
      expect(state.error).toBe(errorMessage)
      expect(state.isAuthenticated).toBe(false)
      expect(state.user).toBe(null)
      expect(state.token).toBe(null)
    })
  })

  describe('state transitions', () => {
    it('should handle complete login flow', () => {
      // Start with initial state
      let state: AuthState = initialState

      // User attempts login - pending
      state = authReducer(state, { type: loginUser.pending.type })
      expect(state.isLoading).toBe(true)
      expect(state.error).toBe(null)

      // Login succeeds - fulfilled
      const mockResponse: AuthResponse = {
        user: {
          id: '1',
          name: 'Test User',
          email: 'test@test.com',
        },
        token: 'mock-jwt-token',
      }
      state = authReducer(state, {
        type: loginUser.fulfilled.type,
        payload: mockResponse,
      })
      expect(state.isLoading).toBe(false)
      expect(state.isAuthenticated).toBe(true)
      expect(state.user).toEqual(mockResponse.user)

      // User logs out
      state = authReducer(state, logout())
      expect(state).toEqual(initialState)
    })

    it('should handle failed login attempt', () => {
      let state: AuthState = initialState

      // User attempts login - pending
      state = authReducer(state, { type: loginUser.pending.type })
      expect(state.isLoading).toBe(true)

      // Login fails - rejected
      state = authReducer(state, {
        type: loginUser.rejected.type,
        payload: 'Invalid credentials',
      })
      expect(state.isLoading).toBe(false)
      expect(state.error).toBe('Invalid credentials')
      expect(state.isAuthenticated).toBe(false)

      // Clear error
      state = authReducer(state, clearError())
      expect(state.error).toBe(null)
    })
  })
})
