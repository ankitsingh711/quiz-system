import { useState } from 'react'
import Head from 'next/head'
import QuizForm from '../components/QuizForm'
import QuizResults from '../components/QuizResults'

export default function Home() {
  const [quizResult, setQuizResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleQuizSubmit = async (formData) => {
    setIsLoading(true)
    setError(null)

    console.log('Frontend: Submitting quiz with data:', formData)
    console.log('Frontend: Form validation check:', {
      hasName: !!formData.name,
      hasEmail: !!formData.email,
      hasAnswers: !!formData.answers,
      answersCount: formData.answers?.length
    })

    try {
      const response = await fetch('/api/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('API Error Response:', data)
        throw new Error(data.message || 'Failed to submit quiz')
      }

      setQuizResult(data.result)
    } catch (err) {
      setError(err.message)
      console.error('Quiz submission error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartNew = () => {
    setQuizResult(null)
    setError(null)
  }

  return (
    <>
      <Head>
        <title>Personality Quiz App</title>
        <meta name="description" content="Discover your personality type and get personalized recommendations" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4">
          {error && (
            <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  !
                </div>
                <div>
                  <p className="text-red-800 font-medium">Error</p>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
              <button
                onClick={() => setError(null)}
                className="mt-3 px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {!quizResult ? (
            <QuizForm 
              onSubmit={handleQuizSubmit} 
              isLoading={isLoading}
            />
          ) : (
            <QuizResults 
              result={quizResult} 
              onStartNew={handleStartNew}
            />
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600">
          <p className="text-sm">
            Built with Next.js, MongoDB, and ZeptoMail
          </p>
          <p className="text-xs mt-2">
            © 2024 Personality Quiz App. All rights reserved.
          </p>
        </footer>
      </main>
    </>
  )
}
