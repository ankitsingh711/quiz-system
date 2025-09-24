import mongoose from 'mongoose'

const QuizResultSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  answers: [{
    questionId: {
      type: Number,
      required: true
    },
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    points: {
      type: Number,
      default: 0
    }
  }],
  totalScore: {
    type: Number,
    required: true,
    default: 0
  },
  personalityType: {
    type: String,
    required: true
  },
  recommendation: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.models.QuizResult || mongoose.model('QuizResult', QuizResultSchema)
