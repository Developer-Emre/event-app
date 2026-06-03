import type { NextPage } from 'next'
import LoginForm from '@/components/auth/LoginForm'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Link from 'next/link'

const LoginPage: NextPage = () => {
  const router = useRouter()
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      const returnUrl = (router.query.returnUrl as string) || '/profile'
      router.replace(returnUrl)
    }
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to book amazing events</p>
        </div>

        {/* Login Card */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginPage