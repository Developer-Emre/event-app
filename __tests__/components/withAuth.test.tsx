import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { useRouter } from 'next/router'
import { withAuth } from '@/components/auth/withAuth'
import authReducer from '@/store/authSlice'
import type { NextPage } from 'next'

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

// Test component
const TestComponent: NextPage = () => {
  return <div>Protected Content</div>
}

const ProtectedComponent = withAuth(TestComponent)

describe('withAuth HOC', () => {
  const mockPush = jest.fn()
  const mockReplace = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      pathname: '/profile',
      replace: mockReplace,
      push: mockPush,
    })
  })

  const createMockStore = (isAuthenticated: boolean) => {
    return configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          user: isAuthenticated
            ? { id: '1', name: 'Test User', email: 'test@test.com' }
            : null,
          token: isAuthenticated ? 'mock-token' : null,
          isAuthenticated,
          isLoading: false,
          error: null,
        },
      },
    })
  }

  it('should render protected component when user is authenticated', () => {
    const store = createMockStore(true)

    render(
      <Provider store={store}>
        <ProtectedComponent />
      </Provider>
    )

    expect(screen.getByText('Protected Content')).toBeTruthy()
    expect(mockReplace).not.toHaveBeenCalled()
  })

  it('should redirect to login when user is not authenticated', () => {
    const store = createMockStore(false)

    render(
      <Provider store={store}>
        <ProtectedComponent />
      </Provider>
    )

    expect(screen.queryByText('Protected Content')).toBeFalsy()
    expect(mockReplace).toHaveBeenCalledWith('/login?returnUrl=%2Fprofile')
  })

  it('should show spinner while redirecting unauthenticated users', () => {
    const store = createMockStore(false)

    const { container } = render(
      <Provider store={store}>
        <ProtectedComponent />
      </Provider>
    )

    // Check for spinner (it renders a div with specific classes)
    const spinner = container.querySelector('.animate-spin')
    expect(spinner).toBeTruthy()
  })

  it('should encode returnUrl correctly', () => {
    const store = createMockStore(false)
    ;(useRouter as jest.Mock).mockReturnValue({
      pathname: '/checkout',
      replace: mockReplace,
      push: mockPush,
    })

    render(
      <Provider store={store}>
        <ProtectedComponent />
      </Provider>
    )

    expect(mockReplace).toHaveBeenCalledWith('/login?returnUrl=%2Fcheckout')
  })

  it('should handle authenticated state changes', () => {
    const store = createMockStore(false)

    const { rerender } = render(
      <Provider store={store}>
        <ProtectedComponent />
      </Provider>
    )

    // Initially not authenticated, should redirect
    expect(mockReplace).toHaveBeenCalled()
    expect(screen.queryByText('Protected Content')).toBeFalsy()

    // Update store to authenticated state
    const authenticatedStore = createMockStore(true)
    rerender(
      <Provider store={authenticatedStore}>
        <ProtectedComponent />
      </Provider>
    )

    // Now should show protected content
    expect(screen.getByText('Protected Content')).toBeTruthy()
  })

  it('should have correct display name', () => {
    expect(ProtectedComponent.displayName).toBe('withAuth(TestComponent)')
  })
})
