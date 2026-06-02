import { useEffect } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { useAppSelector } from '@/hooks/useAppSelector'
import Spinner from '@/components/ui/Spinner'

export function withAuth<P extends object>(Component: NextPage<P>): NextPage<P> {
  const ProtectedPage: NextPage<P> = (props) => {
    const router = useRouter()
    const { isAuthenticated } = useAppSelector((state) => state.auth)

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace(`/login?returnUrl=${encodeURIComponent(router.pathname)}`)
      }
    }, [isAuthenticated, router])

    if (!isAuthenticated) {
      return <Spinner />
    }

    return <Component {...props} />
  }

  ProtectedPage.displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`

  return ProtectedPage
}
