import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '@/hooks/useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 500))
    expect(result.current).toBe('test')
  })

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    )

    expect(result.current).toBe('initial')

    // Update value
    rerender({ value: 'updated', delay: 500 })
    
    // Value should not update immediately
    expect(result.current).toBe('initial')

    // Fast-forward time by 499ms (before delay)
    act(() => {
      jest.advanceTimersByTime(499)
    })
    expect(result.current).toBe('initial')

    // Fast-forward past the delay
    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(result.current).toBe('updated')
  })

  it('should cancel previous timeout on rapid value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'first', delay: 500 },
      }
    )

    // Rapidly change values
    rerender({ value: 'second', delay: 500 })
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    rerender({ value: 'third', delay: 500 })
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    rerender({ value: 'fourth', delay: 500 })
    
    // Value should still be 'first' because we haven't waited full delay
    expect(result.current).toBe('first')

    // After full delay from last change, should be 'fourth'
    act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(result.current).toBe('fourth')
  })

  it('should work with different delay values', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'test', delay: 1000 },
      }
    )

    rerender({ value: 'updated', delay: 1000 })

    // Should not update before 1000ms
    act(() => {
      jest.advanceTimersByTime(999)
    })
    expect(result.current).toBe('test')

    // Should update after 1000ms
    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(result.current).toBe('updated')
  })

  it('should handle zero delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'test', delay: 0 },
      }
    )

    rerender({ value: 'updated', delay: 0 })
    
    // Even with 0 delay, it should debounce to next tick
    expect(result.current).toBe('test')
    
    act(() => {
      jest.advanceTimersByTime(0)
    })
    expect(result.current).toBe('updated')
  })
})
