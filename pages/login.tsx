import type { NextPage } from 'next'
import LoginForm from '@/components/auth/LoginForm'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-600">Sign in to your account</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginPage