export const quizQuestions = [
  {
    id: 1,
    question: "What's your preferred way to spend a weekend?",
    options: [
      { text: "Reading a book or learning something new", value: "introvert", points: 2 },
      { text: "Socializing with friends and family", value: "extrovert", points: 2 },
      { text: "Outdoor activities like hiking or sports", value: "active", points: 2 },
      { text: "Creative pursuits like art, music, or writing", value: "creative", points: 2 }
    ]
  },
  {
    id: 2,
    question: "In a team project, you usually:",
    options: [
      { text: "Take the lead and organize everything", value: "leader", points: 3 },
      { text: "Contribute ideas and collaborate equally", value: "collaborator", points: 2 },
      { text: "Focus on the detailed work behind the scenes", value: "supporter", points: 2 },
      { text: "Bring creative solutions to problems", value: "innovator", points: 3 }
    ]
  },
  {
    id: 3,
    question: "Which skill would you most like to develop?",
    options: [
      { text: "Technical programming skills", value: "technical", points: 3 },
      { text: "Leadership and management abilities", value: "leadership", points: 3 },
      { text: "Creative design and artistic skills", value: "creative", points: 2 },
      { text: "Communication and interpersonal skills", value: "social", points: 2 }
    ]
  },
  {
    id: 4,
    question: "Your ideal work environment is:",
    options: [
      { text: "Quiet space where I can focus deeply", value: "focused", points: 2 },
      { text: "Collaborative open office with team interaction", value: "collaborative", points: 2 },
      { text: "Flexible remote work with autonomy", value: "autonomous", points: 3 },
      { text: "Dynamic startup environment with variety", value: "dynamic", points: 3 }
    ]
  },
  {
    id: 5,
    question: "When facing a complex problem, you:",
    options: [
      { text: "Break it down systematically step by step", value: "analytical", points: 3 },
      { text: "Brainstorm creative solutions first", value: "creative", points: 2 },
      { text: "Research what others have done before", value: "research", points: 2 },
      { text: "Discuss it with others to get different perspectives", value: "collaborative", points: 2 }
    ]
  }
]

export const getPersonalityType = (answers) => {
  const traits = {}
  
  answers.forEach(answer => {
    const option = quizQuestions
      .find(q => q.id === answer.questionId)
      ?.options.find(opt => opt.text === answer.answer)
    
    if (option) {
      traits[option.value] = (traits[option.value] || 0) + option.points
    }
  })
  
  // Find the dominant trait
  const dominantTrait = Object.keys(traits).reduce((a, b) => 
    traits[a] > traits[b] ? a : b
  )
  
  return dominantTrait
}

export const getRecommendation = (personalityType, totalScore) => {
  const recommendations = {
    leader: {
      title: "Natural Leader",
      description: "You have strong leadership qualities and excel at organizing and motivating others.",
      suggestions: [
        "Consider pursuing management or executive roles",
        "Develop your strategic thinking skills",
        "Practice public speaking and presentation skills",
        "Learn about team building and organizational psychology"
      ]
    },
    technical: {
      title: "Technical Expert",
      description: "You enjoy diving deep into technical challenges and building solutions.",
      suggestions: [
        "Focus on advanced programming languages and frameworks",
        "Consider specializing in emerging technologies like AI or blockchain",
        "Build a strong portfolio of technical projects",
        "Contribute to open-source projects to showcase your skills"
      ]
    },
    creative: {
      title: "Creative Innovator",
      description: "You bring fresh perspectives and innovative solutions to challenges.",
      suggestions: [
        "Explore design thinking methodologies",
        "Develop skills in UI/UX design and user research",
        "Consider roles in product design or creative direction",
        "Build a portfolio showcasing your creative projects"
      ]
    },
    collaborative: {
      title: "Team Player",
      description: "You excel at working with others and building strong team relationships.",
      suggestions: [
        "Develop your communication and facilitation skills",
        "Consider roles in project management or team coordination",
        "Learn about agile methodologies and team dynamics",
        "Practice conflict resolution and negotiation skills"
      ]
    },
    analytical: {
      title: "Strategic Analyst",
      description: "You approach problems systematically and excel at logical reasoning.",
      suggestions: [
        "Develop data analysis and visualization skills",
        "Consider roles in business analysis or consulting",
        "Learn statistical analysis and research methods",
        "Practice presenting complex information in simple ways"
      ]
    },
    autonomous: {
      title: "Independent Worker",
      description: "You thrive when given autonomy and prefer self-directed work.",
      suggestions: [
        "Consider freelancing or consulting opportunities",
        "Develop strong self-management and time management skills",
        "Build a personal brand and professional network",
        "Explore entrepreneurship and business development"
      ]
    }
  }
  
  const defaultRecommendation = {
    title: "Versatile Professional",
    description: "You show balanced qualities across multiple areas and can adapt to various roles.",
    suggestions: [
      "Explore different career paths to find your passion",
      "Develop a diverse skill set to increase your flexibility",
      "Consider roles that require adaptability and learning",
      "Network with professionals in various fields"
    ]
  }
  
  const recommendation = recommendations[personalityType] || defaultRecommendation
  
  return {
    ...recommendation,
    score: totalScore,
    level: totalScore >= 12 ? "Advanced" : totalScore >= 8 ? "Intermediate" : "Beginner"
  }
}
