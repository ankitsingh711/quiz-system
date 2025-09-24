# Personality Quiz App

A modern, interactive personality quiz application built with Next.js that helps users discover their personality type and provides personalized recommendations. The app features a multi-part form, MongoDB integration, and automated email confirmations via ZeptoMail.

## ✨ Features

- 🎯 **Interactive Multi-part Quiz**: 5 carefully crafted questions to determine personality type
- 💾 **MongoDB Integration**: Secure storage of quiz results and user data
- 📊 **Personalized Recommendations**: AI-driven insights based on quiz responses
- 📧 **Automated Email Confirmations**: Beautiful HTML emails sent via ZeptoMail
- 🎨 **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS and Framer Motion
- 🚀 **Easy Deployment**: Ready for deployment on Vercel or Netlify
- 📱 **Mobile Responsive**: Works seamlessly on all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose
- **Email Service**: ZeptoMail API
- **Deployment**: Vercel/Netlify ready

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB database (Atlas or local)
- ZeptoMail account and API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd nextjs-quiz-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ZEPTOMAIL_API_KEY=your_zeptomail_api_key
   ZEPTOMAIL_FROM_EMAIL=your_verified_sender_email
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Visit [http://localhost:3000](http://localhost:3000) to see the app in action!

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `ZEPTOMAIL_API_KEY` | ZeptoMail API key for sending emails | Yes |
| `ZEPTOMAIL_FROM_EMAIL` | Verified sender email address | Yes |

### Getting Environment Variables

#### MongoDB Setup
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string from the "Connect" button
4. Replace `<password>` with your database user password

#### ZeptoMail Setup
1. Sign up for [ZeptoMail](https://www.zoho.com/zeptomail/)
2. Verify your domain/email
3. Go to Settings → Mail Agents → Server Setup
4. Generate an API key
5. Use your verified "From" email address

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel dashboard**
   - Go to your project settings
   - Add the environment variables mentioned above

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

4. **Set environment variables in Netlify dashboard**
   - Go to Site settings → Environment variables
   - Add the required variables

### Alternative: Deploy via Git

Both Vercel and Netlify support Git-based deployments:

1. Push your code to GitHub/GitLab
2. Connect your repository in Vercel/Netlify dashboard
3. Set environment variables
4. Deploy automatically on every push

## 🏗️ Project Structure

```
├── components/
│   ├── QuizForm.js          # Multi-step quiz form component
│   └── QuizResults.js       # Results display component
├── data/
│   └── quizQuestions.js     # Quiz questions and scoring logic
├── lib/
│   └── mongodb.js           # MongoDB connection utility
├── models/
│   └── QuizResult.js        # Mongoose schema for quiz results
├── pages/
│   ├── api/
│   │   ├── send-email.js    # Email sending API route
│   │   └── submit-quiz.js   # Quiz submission API route
│   ├── _app.js              # Next.js app wrapper
│   └── index.js             # Main page component
├── styles/
│   └── globals.css          # Global styles with Tailwind
├── .env.local               # Environment variables (local)
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
└── README.md                # This file
```

## 🔍 How It Works

1. **User Journey**:
   - User enters name and email
   - Completes 5 personality questions
   - Receives instant results and recommendations
   - Gets confirmation email with detailed results

2. **Scoring System**:
   - Each answer has weighted points
   - Personality type determined by dominant traits
   - Recommendations tailored to personality type

3. **Data Flow**:
   ```
   Quiz Form → API Route → MongoDB → Email Service → Results Display
   ```

## 🎨 Customization

### Adding New Questions

1. Edit `data/quizQuestions.js`
2. Add new question object with options and scoring
3. Update the total questions count in components

### Modifying Personality Types

1. Update the recommendation logic in `data/quizQuestions.js`
2. Add new personality types and their recommendations
3. Customize the scoring algorithm

### Styling Changes

- Modify `tailwind.config.js` for theme customization
- Update components for layout changes
- Edit `styles/globals.css` for global styles

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Verify your MONGODB_URI is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure database user has proper permissions

**Email Not Sending**
- Verify ZeptoMail API key is valid
- Check if sender email is verified
- Look at API rate limits

**Build Errors**
- Clear node_modules and package-lock.json
- Run `npm install` again
- Check Node.js version compatibility

### Development Tips

```bash
# Clear Next.js cache
rm -rf .next

# Check logs
npm run dev

# Build for production testing
npm run build && npm start
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Search existing GitHub issues
3. Create a new issue with detailed information

## 🎉 Demo

Try the live demo: [Add your deployment URL here]

---

**Built with ❤️ using Next.js, MongoDB, and ZeptoMail**
