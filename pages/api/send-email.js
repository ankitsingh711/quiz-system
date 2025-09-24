export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { email, name, personalityType, recommendation, totalScore } = req.body

    if (!email || !name || !recommendation) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Create email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(90deg, #3b82f6, #2563eb); color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .score-section { background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .recommendations { background: #eff6ff; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .recommendation-item { margin: 10px 0; padding: 10px; background: white; border-radius: 5px; }
          .footer { text-align: center; padding: 20px; font-size: 0.9em; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎉 Your Personality Quiz Results</h1>
          <p>Personalized insights just for you!</p>
        </div>
        
        <div class="content">
          <h2>Hello ${name}!</h2>
          
          <p>Thank you for taking our personality quiz. Here are your detailed results:</p>
          
          <div class="score-section">
            <h3>📊 Your Results</h3>
            <p><strong>Personality Type:</strong> ${recommendation.title}</p>
            <p><strong>Score:</strong> ${totalScore}/15 (${recommendation.level} Level)</p>
            <p><strong>Description:</strong> ${recommendation.description}</p>
          </div>
          
          <div class="recommendations">
            <h3>💡 Personalized Recommendations</h3>
            ${recommendation.suggestions.map((suggestion, index) => `
              <div class="recommendation-item">
                <strong>${index + 1}.</strong> ${suggestion}
              </div>
            `).join('')}
          </div>
          
          <p>We hope these insights help you on your personal and professional journey!</p>
        </div>
        
        <div class="footer">
          <p>This email was sent from the Personality Quiz App</p>
          <p>If you have any questions, feel free to reach out to us.</p>
        </div>
      </body>
      </html>
    `

    // ZeptoMail API configuration
    const zeptomailData = {
      from: {
        address: process.env.ZEPTOMAIL_FROM_EMAIL || 'noreply@yourdomain.com',
        name: 'Personality Quiz App'
      },
      to: [{
        email_address: {
          address: email,
          name: name
        }
      }],
      subject: `Your Personality Quiz Results - ${recommendation.title}`,
      htmlbody: emailHtml
    }

    // Send email via ZeptoMail
    const response = await fetch('https://api.zeptomail.in/v1.1/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Zoho-enczapikey ${process.env.ZEPTOMAIL_API_KEY}`
      },
      body: JSON.stringify(zeptomailData)
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('ZeptoMail API error:', errorData)
      throw new Error(`ZeptoMail API error: ${response.status}`)
    }

    const result = await response.json()
    
    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      messageId: result.data?.[0]?.message_id
    })

  } catch (error) {
    console.error('Email sending error:', error)
    
    // For development/demo purposes, we'll still return success
    // In production, you might want to handle this differently
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode: Simulating email send success')
      return res.status(200).json({
        success: true,
        message: 'Email simulated successfully (development mode)',
        note: 'Configure ZEPTOMAIL_API_KEY and ZEPTOMAIL_FROM_EMAIL for actual email sending'
      })
    }
    
    res.status(500).json({ 
      message: 'Failed to send email',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    })
  }
}
