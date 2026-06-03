interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

const steps = [
  { number: 1, label: 'Review' },
  { number: 2, label: 'Details' },
  { number: 3, label: 'Payment' },
]

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex-1 flex items-center">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step.number < currentStep
                    ? 'bg-green-500 text-white'
                    : step.number === currentStep
                    ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step.number < currentStep ? (
                  <svg
                    className="w-6 h-6"
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
                ) : (
                  step.number
                )}
              </div>
              <p
                className={`mt-2 text-sm font-medium ${
                  step.number === currentStep ? 'text-orange-600' : 'text-gray-600'
                }`}
              >
                {step.label}
              </p>
            </div>
            {index < totalSteps - 1 && (
              <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
