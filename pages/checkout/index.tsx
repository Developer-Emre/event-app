import { useRouter } from 'next/router'
import { useEffect } from 'react'
import type { NextPage } from 'next'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import {
  setPersonalInfo,
  setPaymentInfo,
  nextStep,
  prevStep,
  submitOrder,
} from '@/store/checkoutSlice'
import { addOrder } from '@/store/orderSlice'
import { withAuth } from '@/components/auth/withAuth'
import StepIndicator from '@/components/checkout/StepIndicator'
import CheckoutStep1 from '@/components/checkout/CheckoutStep1'
import CheckoutStep2 from '@/components/checkout/CheckoutStep2'
import CheckoutStep3 from '@/components/checkout/CheckoutStep3'
import Button from '@/components/ui/Button'
import type { PersonalInfo, PaymentInfo } from '@/types/checkout'

const CheckoutPage: NextPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { eventId, eventTitle, seats, personalInfo, paymentInfo, currentStep, isLoading, order } =
    useAppSelector((state) => state.checkout)

  // Save order to orderSlice when checkout is complete
  useEffect(() => {
    if (order) {
      dispatch(addOrder(order))
    }
  }, [order, dispatch])

  if (!eventId || seats.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">No Event Selected</h2>
          <p className="text-gray-600 mb-6">
            Please select an event and seats before proceeding to checkout.
          </p>
          <Button onClick={() => router.push('/')}>Browse Events</Button>
        </div>
      </div>
    )
  }

  if (order) {
    const totalPrice = order.totalPrice
    const orderDate = new Date(order.createdAt)

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Booking Confirmed!
            </h2>
            <p className="text-gray-600">
              Your tickets have been successfully purchased.
            </p>
          </div>

          <div className="border-t border-b border-gray-200 py-6 my-6">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Event:</span>
                <span className="font-medium">{order.eventTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seats:</span>
                <span className="font-medium">
                  {order.seats.map((s) => `${s.row}${s.number}`).join(', ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">
                  {orderDate.toLocaleDateString('tr-TR')}
                </span>
              </div>
              <div className="flex justify-between pt-4 border-t border-gray-200">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-lg text-blue-600">
                  ₺{totalPrice.toLocaleString('tr-TR')}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-blue-800">
              A confirmation email has been sent to <strong>{order.personalInfo.email}</strong>
            </p>
          </div>

          <div className="flex gap-4">
            <Button onClick={() => router.push('/profile/orders')} variant="outline" fullWidth>
              View Orders
            </Button>
            <Button onClick={() => router.push('/')} fullWidth>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const handlePersonalInfoSubmit = (data: PersonalInfo) => {
    dispatch(setPersonalInfo(data))
    dispatch(nextStep())
  }

  const handlePaymentInfoSubmit = async (data: PaymentInfo) => {
    dispatch(setPaymentInfo(data))
    
    await dispatch(
      submitOrder({
        eventId,
        eventTitle,
        seats,
        personalInfo: personalInfo!,
        paymentInfo: data,
        currentStep,
      })
    )
  }

  const handleCancel = () => {
    router.push('/')
  }

  const handleBack = () => {
    dispatch(prevStep())
  }

  const handleNextFromStep1 = () => {
    dispatch(nextStep())
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <StepIndicator currentStep={currentStep} totalSteps={3} />

        {currentStep === 1 && (
          <CheckoutStep1
            eventTitle={eventTitle}
            seats={seats}
            onNext={handleNextFromStep1}
            onCancel={handleCancel}
          />
        )}

        {currentStep === 2 && (
          <CheckoutStep2
            initialData={personalInfo}
            onNext={handlePersonalInfoSubmit}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <CheckoutStep3
            initialData={paymentInfo}
            isLoading={isLoading}
            onSubmit={handlePaymentInfoSubmit}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  )
}

export default withAuth(CheckoutPage)
