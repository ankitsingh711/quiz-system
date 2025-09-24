import mongoose from 'mongoose'
import QuizResult from '../../models/QuizResult'
import { getPersonalityType, getRecommendation, quizQuestions } from '../../data/quizQuestions'

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw new Error('Database connection failed')
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    await connectDB()

    const { name, email, answers } = req.body

    if (!name || !email || !answers || answers.length !== 5) {
      return res.status(400).json({ 
        message: 'Missing required fields or incomplete quiz' 
      })
    }

    // Calculate scores and personality type
    let totalScore = 0
    const processedAnswers = answers.map(answer => {
      const question = quizQuestions.find(q => q.id === answer.questionId)
      const option = question?.options.find(opt => opt.text === answer.answer)
      const points = option?.points || 0
      
      totalScore += points
      
      return {
        questionId: answer.questionId,
        question: question?.question || '',
        answer: answer.answer,
        points
      }
    })

    const personalityType = getPersonalityType(answers)
    const recommendation = getRecommendation(personalityType, totalScore)

    // Save to MongoDB
    const quizResult = new QuizResult({
      name,
      email,
      answers: processedAnswers,
      totalScore,
      personalityType,
      recommendation: JSON.stringify(recommendation)
    })

    await quizResult.save()

    // Send email confirmation
    try {
      await fetch(`${req.headers.origin || 'http://localhost:3000'}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          personalityType,
          recommendation,
          totalScore
        })
      })
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the whole request if email fails
    }

    res.status(200).json({
      success: true,
      result: {
        id: quizResult._id,
        name,
        email,
        totalScore,
        personalityType,
        recommendation
      }
    })

  } catch (error) {
    console.error('Quiz submission error:', error)
    res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}
