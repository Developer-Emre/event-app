import { useAppSelector } from './useAppSelector'
import { useAppDispatch } from './useAppDispatch'
import { logout } from '@/store/authSlice'

export function useAuth() {
  const dispatch = useAppDispatch()
  const { user, isAuthenticated, isLoading, error } = useAppSelector(
    (state) => state.auth
  )

  const handleLogout = () => {
    dispatch(logout())
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    logout: handleLogout,
  }
}
