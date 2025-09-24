import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { quizQuestions } from '../data/quizQuestions'

const QuizForm = ({ onSubmit, isLoading }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    answers: []
  })

  const isPersonalInfo = currentStep === 0
  const isQuizQuestion = currentStep > 0 && currentStep <= quizQuestions.length
  const totalSteps = quizQuestions.length + 1

  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.email) {
      setCurrentStep(1)
    }
  }

  const handleAnswerSelect = (questionId, answer) => {
    const newAnswers = [...formData.answers]
    const existingAnswerIndex = newAnswers.findIndex(a => a.questionId === questionId)
    
    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex] = { questionId, answer }
    } else {
      newAnswers.push({ questionId, answer })
    }
    
    const updatedFormData = { ...formData, answers: newAnswers }
    setFormData(updatedFormData)
    
    // Auto-advance to next question after a brief delay
    setTimeout(() => {
      if (currentStep < quizQuestions.length) {
        setCurrentStep(currentStep + 1)
      } else {
        // Submit the quiz with the updated data
        console.log('Submitting quiz with data:', updatedFormData)
        onSubmit(updatedFormData)
      }
    }, 500)
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentQuestion = isQuizQuestion ? quizQuestions[currentStep - 1] : null
  const currentAnswer = currentQuestion ? 
    formData.answers.find(a => a.questionId === currentQuestion.id)?.answer : null

  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-primary-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isPersonalInfo && (
          <motion.div
            key="personal-info"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to the Personality Quiz
              </h1>
              <p className="text-gray-600">
                Discover your personality type and get personalized recommendations
              </p>
            </div>

            <form onSubmit={handlePersonalInfoSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Start Quiz</span>
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}

        {isQuizQuestion && currentQuestion && (
          <motion.div
            key={`question-${currentQuestion.id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <div className="text-primary-500 font-medium mb-2">
                Question {currentStep} of {quizQuestions.length}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion.id, option.text)}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-all hover:border-primary-300 ${
                    currentAnswer === option.text
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  disabled={isLoading}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      currentAnswer === option.text
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-gray-300'
                    }`}>
                      {currentAnswer === option.text && (
                        <div className="w-full h-full rounded-full bg-white scale-50" />
                      )}
                    </div>
                    <span className="text-gray-900">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                disabled={isLoading}
              >
                <ChevronLeftIcon className="w-5 h-5" />
                <span>Previous</span>
              </button>

              <div className="text-sm text-gray-500">
                {formData.answers.length} of {quizQuestions.length} answered
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              <span className="text-lg">Processing your results...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuizForm
