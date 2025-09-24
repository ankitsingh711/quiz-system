import { motion } from 'framer-motion'
import { CheckCircleIcon, EnvelopeIcon, StarIcon } from '@heroicons/react/24/solid'

const QuizResults = ({ result, onStartNew }) => {
  const { recommendation, personalityType, totalScore, name } = result

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-6 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircleIcon className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Quiz Complete!</h1>
          </div>
          <p className="text-primary-100">
            Hi {name}! Here are your personalized results and recommendations.
          </p>
        </div>

        {/* Results Content */}
        <div className="p-8">
          {/* Score and Type */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <StarIcon className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Your Score
              </h3>
              <div className="text-3xl font-bold text-primary-500">
                {totalScore}/15
              </div>
              <div className="text-sm text-gray-600">
                {recommendation.level} Level
              </div>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Personality Type
              </h3>
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {recommendation.title}
              </div>
              <div className="text-sm text-gray-600 capitalize">
                {personalityType}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              About Your Personality Type
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {recommendation.description}
            </p>
          </div>

          {/* Recommendations */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Personalized Recommendations
            </h3>
            <div className="grid gap-4">
              {recommendation.suggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-4 bg-primary-50 rounded-lg"
                >
                  <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-800">{suggestion}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Email Confirmation */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <EnvelopeIcon className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-green-800 font-medium">
                  Confirmation email sent!
                </p>
                <p className="text-green-700 text-sm">
                  We've sent your detailed results to your email address.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onStartNew}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              Take Quiz Again
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 border-2 border-primary-500 text-primary-500 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              Download Results
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default QuizResults
